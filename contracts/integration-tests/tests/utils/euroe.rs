use concordium_cis2::{TokenAmountU64, TokenIdUnit};
use concordium_smart_contract_testing::*;
use concordium_std::{Deserial, SchemaType, Serial, Serialize};

use super::{cis2, MAX_ENERGY};
pub const MODULE_PATH: &str = "../euroe/dist/module.wasm.v1";

#[derive(Serial, Deserial, SchemaType)]
pub struct MintParams {
    pub owner:  Address,
    pub amount: TokenAmountU64,
}

#[derive(Serialize, SchemaType)]
pub struct RoleTypes {
    pub mintrole:  Address,
    pub burnrole:  Address,
    pub blockrole: Address,
    pub pauserole: Address,
    pub adminrole: Address,
}

pub fn deploy_module(chain: &mut Chain, sender: &Account) -> ModuleDeploySuccess {
    chain
        .module_deploy_v1(
            Signer::with_one_key(),
            sender.address,
            module_load_v1(MODULE_PATH).unwrap(),
        )
        .expect("deploying module")
}

pub fn init(chain: &mut Chain, sender: &Account) -> ContractInitSuccess {
    chain
        .contract_init(Signer::with_one_key(), sender.address, MAX_ENERGY, InitContractPayload {
            amount:    Amount::zero(),
            init_name: OwnedContractName::new_unchecked("init_euroe_stablecoin".to_string()),
            mod_ref:   module_load_v1(MODULE_PATH).unwrap().get_module_ref(),
            param:     OwnedParameter::empty(),
        })
        .expect("init")
}

pub fn grant_role(
    chain: &mut Chain,
    sender: &Account,
    contract: ContractAddress,
    params: &RoleTypes,
) -> ContractInvokeSuccess {
    chain
        .contract_update(
            Signer::with_one_key(),
            sender.address,
            sender.address.into(),
            MAX_ENERGY,
            UpdateContractPayload {
                address:      contract,
                amount:       Amount::zero(),
                receive_name: "grantRole".parse().unwrap(),
                message:      OwnedParameter::from_serial(params).unwrap(),
            },
        )
        .expect("grant role")
}

pub fn mint(
    chain: &mut Chain,
    sender: &Account,
    contract: ContractAddress,
    params: &MintParams,
) -> ContractInvokeSuccess {
    chain
        .contract_update(
            Signer::with_one_key(),
            sender.address,
            sender.address.into(),
            MAX_ENERGY,
            UpdateContractPayload {
                address:      contract,
                amount:       Amount::zero(),
                receive_name: "mint".parse().unwrap(),
                message:      OwnedParameter::from_serial(params).unwrap(),
            },
        )
        .expect("mint")
}

pub fn transfer_single(
    chain: &mut Chain,
    sender: &Account,
    contract: ContractAddress,
    payload: concordium_cis2::Transfer<TokenIdUnit, TokenAmountU64>,
) -> ContractInvokeSuccess {
    cis2::transfer_single(chain, sender, contract, payload)
}

pub fn balance_of_single(
    chain: &mut Chain,
    invoker: &Account,
    contract: ContractAddress,
    address: Address,
) -> TokenAmountU64 {
    cis2::balance_of_single(chain, invoker, contract, TokenIdUnit(), address)
}
