-- Revert budget:user_transactions_view from pg

BEGIN;

DROP VIEW user_transactions;

COMMIT;
