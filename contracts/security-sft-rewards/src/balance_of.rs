use concordium_cis2::*;
use concordium_rwa_utils::state_implementations::holders_state::IHoldersState;
use concordium_rwa_utils::state_implementations::tokens_state::ITokensState;
use concordium_std::*;

use super::error::Error;
use super::state::State;
use super::types::{ContractResult, TokenAmount, TokenId};

/// Queries the balance of the specified token IDs for the given addresses.
///
/// This function takes a list of `BalanceOfQueryParams` and
/// returns a `BalanceOfQueryResponse` containing the token balances for each query.
///
/// # Returns
/// A `ContractResult` containing the token balances for each query.
#[receive(
    contract = "security_sft_rewards",
    name = "balanceOf",
    parameter = "BalanceOfQueryParams<TokenId>",
    return_value = "BalanceOfQueryResponse<TokenAmount>",
    error = "super::error::Error"
)]
pub fn balance_of(
    ctx: &ReceiveContext,
    host: &Host<State>,
) -> ContractResult<BalanceOfQueryResponse<TokenAmount>> {
    let BalanceOfQueryParams { queries }: BalanceOfQueryParams<TokenId> =
        ctx.parameter_cursor().get()?;
    let state = host.state();
    let res: Result<Vec<TokenAmount>, Error> = queries
        .iter()
        .map(|q| {
            state.ensure_token_exists(&q.token_id)?;
            Ok(state.balance_of(&q.address, &q.token_id))
        })
        .collect();

    Ok(BalanceOfQueryResponse(res?))
}
