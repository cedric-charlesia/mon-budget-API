-- Verify budget:user_transactions_view on pg

BEGIN;

SELECT id FROM user_transactions WHERE false;

ROLLBACK;
