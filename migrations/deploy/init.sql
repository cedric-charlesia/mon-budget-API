-- Deploy budget:init to pg

BEGIN;

CREATE TABLE "user" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL
);

CREATE TABLE "category" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tag TEXT NOT NULL,
    "type" TEXT NOT NULL,
    user_id INT REFERENCES "user"(id)    
);

CREATE TABLE "transaction" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "date" DATE NOT NULL,
    "description" TEXT,
    amount INT NOT NULL,
    category_id INT REFERENCES category(id)   
);

COMMIT;
