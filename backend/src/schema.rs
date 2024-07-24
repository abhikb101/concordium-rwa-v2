// @generated automatically by Diesel CLI.

diesel::table! {
    identity_registry_agents (agent_address) {
        agent_address -> Varchar,
        create_time -> Timestamp,
        contract_index -> Numeric,
        contract_sub_index -> Numeric,
    }
}

diesel::table! {
    identity_registry_identities (identity_address) {
        identity_address -> Varchar,
        create_time -> Timestamp,
        contract_index -> Numeric,
        contract_sub_index -> Numeric,
    }
}

diesel::table! {
    identity_registry_issuers (issuer_address) {
        issuer_address -> Varchar,
        create_time -> Timestamp,
        contract_index -> Numeric,
        contract_sub_index -> Numeric,
    }
}

diesel::table! {
    listener_config (id) {
        id -> Int4,
        last_block_height -> Numeric,
        last_block_hash -> Bytea,
    }
}

diesel::table! {
    listener_contracts (index) {
        module_ref -> Bytea,
        contract_name -> Varchar,
        index -> Numeric,
        sub_index -> Numeric,
    }
}

diesel::table! {
    verifier_challenges (id) {
        id -> Int4,
        create_time -> Timestamp,
        update_time -> Timestamp,
        challenge -> Bytea,
        account_address -> Bytea,
        verifier_account_address -> Bytea,
        identity_registry_index -> Numeric,
        identity_registry_sub_index -> Numeric,
        txn_hash -> Nullable<Bytea>,
    }
}

diesel::allow_tables_to_appear_in_same_query!(
    identity_registry_agents,
    identity_registry_identities,
    identity_registry_issuers,
    listener_config,
    listener_contracts,
    verifier_challenges,
);
