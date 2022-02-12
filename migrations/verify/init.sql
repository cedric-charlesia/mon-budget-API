-- Verify budget:init on pg

BEGIN;

SELECT id FROM "user" WHERE false;
SELECT id FROM "transaction" WHERE false;
SELECT id FROM category WHERE false;

ROLLBACK;
