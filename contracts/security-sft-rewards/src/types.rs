use super::error::Error;
use concordium_cis2::Receiver;
use concordium_std::{ContractAddress, SchemaType, Serialize};

use concordium_rwa_utils::concordium_cis2_security::{self, AgentWithRoles};
pub type ContractResult<R> = Result<R, Error>;
pub type TokenAmount = concordium_cis2::TokenAmountU64;
pub type TokenId = concordium_cis2::TokenIdU32;
pub type Event = concordium_cis2_security::Cis2SecurityEvent<TokenId, TokenAmount, AgentRole>;

#[derive(Debug, Serialize, SchemaType, PartialEq, Eq, Clone, Copy)]
pub enum AgentRole {
    SetIdentityRegistry,
    SetCompliance,
    AddAgent,
    Mint,
    /// The role to force a burn of tokens. This roles also means that while
    /// burning the agent will be able to unfreeze tokens
    ForcedBurn,
    /// The role to force a transfer of tokens. This roles also means that while
    /// transferring the agent will be able to unfreeze tokens
    ForcedTransfer,
    Freeze,
    UnFreeze,
    HolderRecovery,
}

impl AgentRole {
    /// Returns a list of roles that can be assigned to the owner of the
    /// contract. This should ideally be all the roles.
    pub fn owner_roles() -> Vec<Self> {
        vec![
            Self::SetIdentityRegistry,
            Self::SetCompliance,
            Self::AddAgent,
            Self::Mint,
            Self::ForcedBurn,
            Self::ForcedTransfer,
            Self::Freeze,
            Self::UnFreeze,
            Self::HolderRecovery,
        ]
    }
}

pub type Agent = AgentWithRoles<AgentRole>;
pub type BurnParams = concordium_cis2_security::BurnParams<TokenId, TokenAmount>;
pub type Burn = concordium_cis2_security::Burn<TokenId, TokenAmount>;
pub type FreezeParams = concordium_cis2_security::FreezeParams<TokenId, TokenAmount>;
pub type FrozenParams = concordium_cis2_security::FrozenParams<TokenId>;
pub type FrozenResponse = concordium_cis2_security::FrozenResponse<TokenAmount>;
pub type ContractTransferParams = concordium_cis2::TransferParams<TokenId, TokenAmount>;
pub use concordium_cis2_security::RecoverParam;
pub use concordium_rwa_utils::cis2_types::ContractMetadataUrl;

#[derive(Serialize, SchemaType)]
pub struct InitParam {
    pub identity_registry: ContractAddress,
    pub compliance:        ContractAddress,
    pub sponsors:          Vec<ContractAddress>,
    pub metadata_url:      ContractMetadataUrl,
}

#[derive(Serialize, SchemaType)]
pub struct MintParam {
    /// The owner of the minted token.
    pub owner:    Receiver,
    /// Token Id to Mint.
    pub token_id: TokenId,
    /// Amount to Mint.
    pub amount:   TokenAmount,
}
