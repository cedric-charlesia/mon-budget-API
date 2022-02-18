-- Deploy budget:user_transactions_view to pg

BEGIN;

CREATE OR REPLACE VIEW user_transactions AS (
	SELECT
	"transaction".*,
	category.tag,
	category.type,
	category.user_id,
	"user".username,
	"user".email
    FROM "transaction"
	JOIN category ON category.id = "transaction".category_id
	JOIN "user" ON "user".id = "category".user_id
	ORDER BY "date" DESC
);

COMMIT;
