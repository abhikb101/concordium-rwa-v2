//! # Transactions Listener
//! This module contains the implementation of the transactions listener.
//! It provides functionality for listening to transactions from a Concordium
//! node and handling transaction-related operations. The `TransactionsListener`
//! struct is used to listen to transactions from the Concordium node and
//! process them. The `EventsProcessor` trait is used to define the interface
//! for processing events.

mod db;
mod listener;
mod schema;
pub use db::migrations::{run_migrations, MigrationsConfig};
pub use listener::{EventsProcessor, TransactionsListener};
