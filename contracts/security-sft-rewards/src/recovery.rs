use concordium_protocols::concordium_cis2_security::RecoverEvent;
use concordium_rwa_utils::{
    clients::identity_registry_client::{IdentityRegistryClient, IdentityRegistryContract},
    state_implementations::{
        agent_with_roles_state::IAgentWithRolesState, holders_security_state::IHoldersSecurityState,
    },
};
use concordium_std::*;

use super::{
    error::*,
    state::State,
    types::{AgentRole, ContractResult, Event, RecoverParam},
};

#[receive(
    contract = "security_sft_rewards",
    name = "recover",
    mutable,
    enable_logger,
    parameter = "RecoverParam",
    error = "super::error::Error"
)]
pub fn recover(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    logger: &mut Logger,
) -> ContractResult<()> {
    let RecoverParam {
        lost_account,
        new_account,
    }: RecoverParam = ctx.parameter_cursor().get()?;
    let state = host.state_mut();
    ensure!(state.is_agent(&ctx.sender(), vec![&AgentRole::HolderRecovery]), Error::Unauthorized);
    ensure!(
        IdentityRegistryContract(state.identity_registry()).is_same(
            host,
            &lost_account,
            &new_account
        )?,
        Error::UnVerifiedIdentity
    );

    host.state_mut().recover(lost_account, new_account)?;
    logger.log(&Event::Recovered(RecoverEvent {
        lost_account,
        new_account,
    }))?;

    Ok(())
}

#[receive(
    contract = "security_sft_rewards",
    name = "recoveryAddress",
    parameter = "Address",
    error = "super::error::Error",
    return_value = "Option<Address>"
)]
pub fn recovery_address(
    ctx: &ReceiveContext,
    host: &Host<State>,
) -> ContractResult<Option<Address>> {
    let address: Address = ctx.parameter_cursor().get()?;
    Ok(host.state().get_recovery_address(&address))
}
