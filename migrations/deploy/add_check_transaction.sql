-- Deploy budget:add_check_transaction to pg

BEGIN;

ALTER TABLE "transaction"
ADD COLUMN "check" TEXT NOT NULL DEFAULT false;

COMMIT;
