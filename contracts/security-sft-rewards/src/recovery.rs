use super::{
    error::*,
    state::State,
    types::{AgentRole, ContractResult, RecoverParam, Event},
};
use concordium_rwa_utils::{
    agent_with_roles_state::IAgentWithRolesState, clients::identity_registry_client::{IdentityRegistryClient, IdentityRegistryContract}, concordium_cis2_security, holders_security_state::IHoldersSecurityState
};
use concordium_std::*;

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
    logger.log(&Event::Recovered(concordium_cis2_security::RecoverEvent {
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