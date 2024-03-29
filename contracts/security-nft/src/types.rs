use super::error::Error;
use concordium_cis2::Receiver;
use concordium_rwa_utils::{cis2_types, concordium_cis2_security};
use concordium_std::*;

pub type ContractResult<R> = Result<R, Error>;
pub type TokenAmount = cis2_types::NftTokenAmount;
pub type TokenId = cis2_types::TokenId;
pub type TransferParams = concordium_cis2::TransferParams<TokenId, TokenAmount>;
pub type Transfer = concordium_cis2::Transfer<TokenId, TokenAmount>;
pub type ContractBalanceOfQueryParams = concordium_cis2::BalanceOfQueryParams<TokenId>;
pub type ContractBalanceOfQueryResponse = concordium_cis2::BalanceOfQueryResponse<TokenAmount>;
pub type PauseParams = concordium_cis2_security::PauseParams<TokenId>;
pub type IsPausedResponse = concordium_cis2_security::IsPausedResponse;
pub type BurnParams = concordium_cis2_security::BurnParams<TokenId, TokenAmount>;
pub type Burn = concordium_cis2_security::Burn<TokenId, TokenAmount>;
pub type FreezeParams = concordium_cis2_security::FreezeParams<TokenId, TokenAmount>;
pub type FreezeParam = concordium_cis2_security::FreezeParam<TokenId, TokenAmount>;
pub type FrozenParams = concordium_cis2_security::FrozenParams<TokenId>;
pub type FrozenResponse = concordium_cis2_security::FrozenResponse<TokenAmount>;
pub use concordium_cis2_security::RecoverParam;

#[derive(Serialize, SchemaType)]
pub struct InitParam {
    pub identity_registry: ContractAddress,
    pub compliance:        ContractAddress,
    pub sponsors:          Vec<ContractAddress>,
}

/// Represents the metadata URL and hash of a token.
#[derive(SchemaType, Serial, Clone, Deserial)]
pub struct ContractMetadataUrl {
    pub url:  String,
    pub hash: Option<String>,
}

impl From<ContractMetadataUrl> for MetadataUrl {
    fn from(val: ContractMetadataUrl) -> Self {
        MetadataUrl {
            url:  val.url,
            hash: {
                if let Some(hash) = val.hash {
                    let mut hash_bytes = [0u8; 32];
                    match hex::decode_to_slice(hash, &mut hash_bytes) {
                        Ok(_) => Some(hash_bytes),
                        Err(_) => None,
                    }
                } else {
                    None
                }
            },
        }
    }
}

#[derive(Serialize, SchemaType)]
pub struct MintParam {
    pub metadata_url: ContractMetadataUrl,
}

#[derive(Serialize, SchemaType)]
pub struct MintParams {
    pub owner:  Receiver,
    pub tokens: Vec<MintParam>,
}
