#![cfg(test)]

mod utils;

use concordium_cis2::{BalanceOfQuery, TokenAmountU64, TokenIdUnit};
use concordium_protocols::concordium_cis2_security::{AgentWithRoles, FreezeParam, FreezeParams};
use concordium_smart_contract_testing::*;
use security_sft_single::types::*;
use utils::{compliance, euroe, identity_registry, security_sft_single_client};

const TOKEN_ID: TokenIdUnit = TokenIdUnit();
const METADATA_URL: &str = "example.com";
const ADMIN: AccountAddress = AccountAddress([0; 32]);
const AGENT_MINT: AccountAddress = AccountAddress([1; 32]);
const HOLDER: AccountAddress = AccountAddress([2; 32]);
const COMPLIANT_NATIONALITIES: [&str; 2] = ["IN", "US"];
const DEFAULT_ACC_BALANCE: Amount = Amount {
    micro_ccd: 1_000_000_000_u64,
};

#[test]
fn mint() {
    let admin = Account::new(ADMIN, DEFAULT_ACC_BALANCE);
    let mut chain = Chain::new();
    let (ir_contract, compliance_contract) =
        setup_chain(&mut chain, &admin, COMPLIANT_NATIONALITIES.to_vec());
    let agent_mint = Account::new(AGENT_MINT, DEFAULT_ACC_BALANCE);
    chain.create_account(agent_mint.clone());
    let non_agent_mint = Account::new(AccountAddress([99; 32]), DEFAULT_ACC_BALANCE);
    chain.create_account(non_agent_mint.clone());
    let non_agent = Account::new(AccountAddress([98; 32]), DEFAULT_ACC_BALANCE);
    chain.create_account(non_agent.clone());

    let token_contract =
        create_token_contract(&mut chain, &admin, compliance_contract, ir_contract);
    security_sft_single_client::add_agent(&mut chain, &admin, token_contract, &AgentWithRoles {
        address: Address::Account(agent_mint.address),
        roles:   vec![AgentRole::Mint],
    });
    security_sft_single_client::add_agent(&mut chain, &admin, token_contract, &AgentWithRoles {
        address: Address::Account(non_agent_mint.address),
        roles:   vec![AgentRole::Pause],
    });

    let holder = Account::new(HOLDER, DEFAULT_ACC_BALANCE);
    chain.create_account(holder.clone());
    identity_registry::register_nationalities(&mut chain, &admin, &ir_contract, vec![(
        Address::Account(holder.address),
        COMPLIANT_NATIONALITIES[1],
    )]);

    security_sft_single_client::mint_raw(
        &mut chain,
        &non_agent_mint,
        &token_contract,
        &MintParams {
            owners:   vec![MintParam {
                amount:  TokenAmountU64(10),
                address: holder.address,
            }],
            token_id: TOKEN_ID,
        },
    )
    .expect_err("non-agent-mint minted");
    security_sft_single_client::mint_raw(&mut chain, &non_agent, &token_contract, &MintParams {
        owners:   vec![MintParam {
            amount:  TokenAmountU64(10),
            address: holder.address,
        }],
        token_id: TOKEN_ID,
    })
    .expect_err("non-agent minted");
    security_sft_single_client::mint(&mut chain, &agent_mint, &token_contract, &MintParams {
        owners:   vec![MintParam {
            amount:  TokenAmountU64(10),
            address: holder.address,
        }],
        token_id: TOKEN_ID,
    });
    assert_eq!(
        security_sft_single_client::balance_of(
            &mut chain,
            &holder,
            token_contract,
            &concordium_cis2::BalanceOfQueryParams {
                queries: vec![BalanceOfQuery {
                    address:  Address::Account(holder.address),
                    token_id: TOKEN_ID,
                },],
            }
        ),
        concordium_cis2::BalanceOfQueryResponse(vec![TokenAmountU64(10)])
    );
}

#[test]
fn burn() {
    let admin = Account::new(ADMIN, DEFAULT_ACC_BALANCE);
    let mut chain = Chain::new();
    let (ir_contract, compliance_contract) =
        setup_chain(&mut chain, &admin, COMPLIANT_NATIONALITIES.to_vec());
    let token_contract =
        create_token_contract(&mut chain, &admin, compliance_contract, ir_contract);
    let holder = Account::new(HOLDER, DEFAULT_ACC_BALANCE);
    chain.create_account(holder.clone());
    let holder2 = Account::new(AccountAddress([99; 32]), DEFAULT_ACC_BALANCE);
    chain.create_account(holder2.clone());

    identity_registry::register_nationalities(&mut chain, &admin, &ir_contract, vec![
        (Address::Account(holder.address), COMPLIANT_NATIONALITIES[1]),
        (
            Address::Account(holder2.address),
            COMPLIANT_NATIONALITIES[1],
        ),
    ]);

    security_sft_single_client::mint(&mut chain, &admin, &token_contract, &MintParams {
        owners:   vec![MintParam {
            amount:  TokenAmountU64(50),
            address: holder.address,
        }],
        token_id: TOKEN_ID,
    });
    security_sft_single_client::freeze(&mut chain, &admin, token_contract, &FreezeParams {
        owner:  Address::Account(holder.address),
        tokens: vec![FreezeParam {
            token_id:     TOKEN_ID,
            token_amount: TokenAmountU64(10),
        }],
    });
    security_sft_single_client::burn_raw(
        &mut chain,
        &holder2,
        token_contract,
        &concordium_protocols::concordium_cis2_security::BurnParams(vec![Burn {
            amount:   TokenAmountU64(5),
            owner:    Address::Account(holder.address),
            token_id: TOKEN_ID,
        }]),
    )
    .expect_err("non-owner burned");
    security_sft_single_client::burn_raw(
        &mut chain,
        &holder,
        token_contract,
        &concordium_protocols::concordium_cis2_security::BurnParams(vec![Burn {
            amount:   TokenAmountU64(41),
            owner:    Address::Account(holder.address),
            token_id: TOKEN_ID,
        }]),
    )
    .expect_err("burned frozen");
    security_sft_single_client::burn(
        &mut chain,
        &holder,
        token_contract,
        &concordium_protocols::concordium_cis2_security::BurnParams(vec![Burn {
            amount:   TokenAmountU64(5),
            owner:    Address::Account(holder.address),
            token_id: TOKEN_ID,
        }]),
    );
    assert_eq!(
        security_sft_single_client::balance_of(
            &mut chain,
            &holder,
            token_contract,
            &concordium_cis2::BalanceOfQueryParams {
                queries: vec![BalanceOfQuery {
                    address:  Address::Account(holder.address),
                    token_id: TOKEN_ID,
                },],
            }
        ),
        concordium_cis2::BalanceOfQueryResponse(vec![TokenAmountU64(45)])
    );
    security_sft_single_client::burn_raw(
        &mut chain,
        &holder,
        token_contract,
        &concordium_protocols::concordium_cis2_security::BurnParams(vec![Burn {
            amount:   TokenAmountU64(46),
            owner:    Address::Account(holder.address),
            token_id: TOKEN_ID,
        }]),
    )
    .expect_err("burned more than minted");
    security_sft_single_client::burn_raw(
        &mut chain,
        &holder2,
        token_contract,
        &concordium_protocols::concordium_cis2_security::BurnParams(vec![Burn {
            amount:   TokenAmountU64(5),
            owner:    Address::Account(holder2.address),
            token_id: TOKEN_ID,
        }]),
    )
    .expect_err("non-existing holder burned");
    security_sft_single_client::un_freeze(&mut chain, &admin, token_contract, &FreezeParams {
        owner:  Address::Account(holder.address),
        tokens: vec![FreezeParam {
            token_id:     TOKEN_ID,
            token_amount: TokenAmountU64(9),
        }],
    });
    security_sft_single_client::burn(
        &mut chain,
        &holder,
        token_contract,
        &concordium_protocols::concordium_cis2_security::BurnParams(vec![Burn {
            amount:   TokenAmountU64(41),
            owner:    Address::Account(holder.address),
            token_id: TOKEN_ID,
        }]),
    );
    assert_eq!(
        security_sft_single_client::balance_of(
            &mut chain,
            &holder,
            token_contract,
            &concordium_cis2::BalanceOfQueryParams {
                queries: vec![BalanceOfQuery {
                    address:  Address::Account(holder.address),
                    token_id: TOKEN_ID,
                },],
            }
        ),
        concordium_cis2::BalanceOfQueryResponse(vec![TokenAmountU64(4)])
    );

    security_sft_single_client::pause(
        &mut chain,
        &admin,
        token_contract,
        &concordium_protocols::concordium_cis2_security::PauseParams {
            tokens: vec![TOKEN_ID],
        },
    );
    security_sft_single_client::burn_raw(
        &mut chain,
        &holder,
        token_contract,
        &concordium_protocols::concordium_cis2_security::BurnParams(vec![Burn {
            amount:   TokenAmountU64(1),
            owner:    Address::Account(holder.address),
            token_id: TOKEN_ID,
        }]),
    )
    .expect_err("burned paused token");
}

fn create_token_contract(
    chain: &mut Chain,
    admin: &Account,
    compliance_contract: ContractAddress,
    ir_contract: ContractAddress,
) -> ContractAddress {
    security_sft_single_client::init(chain, admin, &InitParam {
        compliance:        compliance_contract,
        identity_registry: ir_contract,
        metadata_url:      ContractMetadataUrl {
            hash: None,
            url:  METADATA_URL.to_string(),
        },
        sponsors:          None,
    })
    .contract_address
}

fn setup_chain(
    chain: &mut Chain,
    admin: &Account,
    compliant_nationalities: Vec<&str>,
) -> (ContractAddress, ContractAddress) {
    chain.create_account(admin.clone());

    euroe::deploy_module(chain, admin);
    identity_registry::deploy_module(chain, admin);
    compliance::deploy_module(chain, admin);
    security_sft_single_client::deploy_module(chain, admin);
    let ir_contract = identity_registry::init(chain, admin).contract_address;
    let compliance_contract =
        compliance::init_all(chain, admin, ir_contract, compliant_nationalities).contract_address;

    (ir_contract, compliance_contract)
}
