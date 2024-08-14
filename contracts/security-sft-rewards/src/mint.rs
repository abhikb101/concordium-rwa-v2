use concordium_cis2::{AdditionalData, Cis2Event, MintEvent, OnReceivingCis2Params, Receiver};
use concordium_protocols::concordium_cis2_ext::IsTokenAmount;
use concordium_protocols::concordium_cis2_security::{
    compliance_client, identity_registry_client, CanTransferParam, MintedParam, TokenUId,
};
use concordium_rwa_utils::state_implementations::agent_with_roles_state::IAgentWithRolesState;
use concordium_rwa_utils::state_implementations::holders_security_state::IHoldersSecurityState;
use concordium_rwa_utils::state_implementations::holders_state::IHoldersState;
use concordium_std::*;

use super::error::*;
use super::state::State;
use super::types::*;

#[receive(
    contract = "security_sft_rewards",
    name = "mint",
    enable_logger,
    mutable,
    parameter = "MintParam",
    error = "Error"
)]
pub fn mint(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    logger: &mut Logger,
) -> ContractResult<()> {
    let self_address = ctx.self_address();
    let params: MintParam = ctx.parameter_cursor().get()?;
    let can_mint = host.state().is_agent(&ctx.sender(), vec![AgentRole::Mint]);
    ensure!(can_mint, Error::Unauthorized);

    let state = host.state();
    let owner_address = params.owner.address();

    // Ensure that the owner is not recovered
    state.ensure_not_recovered(&owner_address)?;
    // Ensure that the owner is verified
    ensure!(
        identity_registry_client::is_verified(host, state.identity_registry(), &owner_address)?,
        Error::UnVerifiedIdentity
    );

    let compliance = state.compliance();
    let token_id = params.token_id;
    let mint_amount = params.amount;
    ensure!(mint_amount.gt(&TokenAmount::zero()), Error::InvalidAmount);
    let compliance_token = TokenUId::new(token_id, self_address);
    let compliance_can_transfer =
        compliance_client::can_transfer(host, compliance, &CanTransferParam {
            token_id: compliance_token,
            amount:   mint_amount,
            to:       owner_address,
        })?;
    ensure!(compliance_can_transfer, Error::InCompliantTransfer);

    // Minting Logic
    let (state, state_builder) = host.state_and_builder();
    state.add_balance(owner_address, &token_id, mint_amount, state_builder)?;
    // Notify compliance that the token has been minted
    compliance_client::minted(host, compliance, &MintedParam {
        token_id: compliance_token,
        amount:   mint_amount,
        owner:    owner_address,
    })?;
    // Log the mint event
    logger.log(&Event::Cis2(Cis2Event::Mint(MintEvent {
        token_id,
        amount: mint_amount,
        owner: owner_address,
    })))?;
    // If the receiver is a contract: invoke the receive hook function.
    if let Receiver::Contract(address, function) = &params.owner {
        let parameter = OnReceivingCis2Params {
            token_id,
            amount: mint_amount,
            // From self because the minting is being done from deposited tokens in custody of the
            // current contract
            from: self_address.into(),
            data: AdditionalData::empty(),
        };
        host.invoke_contract(
            address,
            &parameter,
            function.as_entrypoint_name(),
            Amount::zero(),
        )?;
    }

    Ok(())
}
