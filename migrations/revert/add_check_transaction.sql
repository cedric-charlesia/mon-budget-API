-- Revert budget:add_check_transaction from pg

BEGIN;

ALTER TABLE "transaction"
DROP COLUMN "check";

COMMIT;
