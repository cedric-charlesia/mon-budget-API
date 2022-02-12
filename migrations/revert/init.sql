-- Revert budget:init from pg

BEGIN;

DROP TABLE "user", "transaction", category;

COMMIT;
