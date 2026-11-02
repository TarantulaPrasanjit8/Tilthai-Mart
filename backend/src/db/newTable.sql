CREATE SCHEMA IF NOT EXISTS "testdb";

CREATE TABLE "testdb"."category" (
    "id" serial NOT NULL,
    "cat_name" varchar NOT NULL,
    "cat_code" int NOT NULL,
    "updated_at" timestamp NOT NULL,
    "created_at" timestamp NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE "testdb"."products" (
    "id" bigserial NOT NULL,
    "product_name" varchar NOT NULL,
    "marchant_name" varchar,
    "price" real NOT NULL,
    "tax" varchar NOT NULL,
    "discount" varchar,
    "availability" boolean NOT NULL DEFAULT true,
    "category_id" int NOT NULL,
    "image_link" text,
    "updated_at" timestamp NOT NULL,
    "created_at" timestamp NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE "testdb"."order" (
    "id" bigserial NOT NULL,
    "user_id" bigint NOT NULL,
    "status" text,
    "placed_at" timestamp NOT NULL,
    "accepted_at" timestamp,
    "delivery_at" timestamp,
    "payment_method" text NOT NULL,
    "updated_at" timestamp NOT NULL,
    "created_at" timestamp NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE "testdb"."users" (
    "id" bigserial NOT NULL,
    "full_name" varchar NOT NULL,
    "email" varchar NOT NULL UNIQUE,
    "phone_no" varchar NOT NULL UNIQUE,
    "type" varchar NOT NULL,
    "pincode" varchar NOT NULL,
    "address" text NOT NULL,
    "updated_at" timestamp NOT NULL,
    "created_at" timestamp NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE "testdb"."order_items" (
    "id" bigserial NOT NULL,
    "order_id" bigint NOT NULL,
    "product_id" bigint NOT NULL,
    "quantity" int NOT NULL,
    "price_at_purchage" real NOT NULL,
    "updated_at" timestamp NOT NULL,
    "created_at" timestamp NOT NULL,
    PRIMARY KEY ("id")
);

-- Foreign key constraints
-- Schema: testdb
ALTER TABLE "testdb"."products" ADD CONSTRAINT "fk_products_category_id_category_id" FOREIGN KEY("category_id") REFERENCES "testdb"."category"("id");
ALTER TABLE "testdb"."order_items" ADD CONSTRAINT "fk_order_items_order_id_order_id" FOREIGN KEY("order_id") REFERENCES "testdb"."order"("id");
ALTER TABLE "testdb"."order_items" ADD CONSTRAINT "fk_order_items_product_id_products_id" FOREIGN KEY("product_id") REFERENCES "testdb"."products"("id");
ALTER TABLE "testdb"."order" ADD CONSTRAINT "fk_order_user_id_users_id" FOREIGN KEY("user_id") REFERENCES "testdb"."users"("id");