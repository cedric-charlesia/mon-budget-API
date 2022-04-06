-- Verify budget:add_check_transaction on pg

BEGIN;

SELECT id FROM "transaction" WHERE false;

ROLLBACK;
