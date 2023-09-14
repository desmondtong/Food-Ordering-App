-- -------------------------------------------------------------
-- TablePlus 5.4.0(504)
--
-- https://tableplus.com/
--
-- Database: burps
-- Generation Time: 2023-09-15 02:53:35.6840
-- -------------------------------------------------------------


-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS addresses_address_id_seq;

-- Table Definition
CREATE TABLE "public"."addresses" (
    "address_id" int2 NOT NULL DEFAULT nextval('addresses_address_id_seq'::regclass),
    "id" uuid NOT NULL,
    "address" text NOT NULL,
    "postal_code" bpchar(6) NOT NULL,
    PRIMARY KEY ("address_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."availabilities" (
    "availability" bool NOT NULL,
    PRIMARY KEY ("availability")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."carts" (
    "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" uuid NOT NULL,
    "total_price" numeric(10,2),
    PRIMARY KEY ("uuid")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS addresses_address_id_seq;

-- Table Definition
CREATE TABLE "public"."carts_items" (
    "item_id" uuid NOT NULL,
    "cart_id" uuid NOT NULL,
    "item_price" numeric(10,2) NOT NULL,
    "quantity_ordered" int2 NOT NULL DEFAULT 1,
    "user_note" text,
    "is_deleted" bool NOT NULL DEFAULT false,
    "id" int2 NOT NULL DEFAULT nextval('addresses_address_id_seq'::regclass),
    PRIMARY KEY ("item_id","cart_id","id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."categories" (
    "category" text NOT NULL,
    PRIMARY KEY ("category")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."item_categories" (
    "category" text NOT NULL,
    "item_id" uuid NOT NULL,
    PRIMARY KEY ("item_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."items" (
    "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "availability" bool NOT NULL DEFAULT true,
    "vendor_id" uuid NOT NULL,
    "name" text NOT NULL,
    "item_price" numeric(10,2) NOT NULL,
    "image_url" text,
    "description" text,
    "is_deleted" bool NOT NULL DEFAULT false,
    PRIMARY KEY ("uuid")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."items_orders" (
    "item_id" uuid NOT NULL,
    "order_id" uuid NOT NULL,
    "item_price" numeric(10,2) NOT NULL,
    "quantity_ordered" int2 NOT NULL,
    "user_note" text,
    PRIMARY KEY ("item_id","order_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."opening_days" (
    "opening_day" text NOT NULL,
    PRIMARY KEY ("opening_day")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."orders" (
    "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" uuid NOT NULL,
    "vendor_id" uuid NOT NULL,
    "status" text NOT NULL DEFAULT 'SENT'::text,
    "rating" numeric(2,1),
    "total_price" numeric(10,2) NOT NULL,
    "review" text,
    "date" date NOT NULL DEFAULT (timezone('Asia/Singapore'::text, CURRENT_TIMESTAMP))::date,
    "time" time NOT NULL DEFAULT (timezone('Asia/Singapore'::text, CURRENT_TIMESTAMP))::time without time zone,
    "is_active" bool NOT NULL DEFAULT true,
    PRIMARY KEY ("uuid")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."roles" (
    "role" text NOT NULL,
    PRIMARY KEY ("role")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."statuses" (
    "status" text NOT NULL,
    PRIMARY KEY ("status")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."types" (
    "type" text NOT NULL,
    PRIMARY KEY ("type")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."user_details" (
    "user_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "first_name" varchar(50) NOT NULL,
    "last_name" varchar(50) NOT NULL,
    PRIMARY KEY ("user_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."users" (
    "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "role" text,
    "email" text NOT NULL,
    "password" text NOT NULL,
    "contact" bpchar(8) NOT NULL,
    "is_deleted" bool DEFAULT false,
    PRIMARY KEY ("uuid")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."vendor_details" (
    "vendor_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "category" text NOT NULL,
    "store_name" varchar(50) NOT NULL,
    "description" text,
    "rating" numeric(2,1),
    "image_url" text,
    PRIMARY KEY ("vendor_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."vendor_operatings" (
    "opening_day" text NOT NULL,
    "vendor_id" uuid NOT NULL,
    "opening_time" time NOT NULL,
    "closing_time" time NOT NULL,
    "is_deleted" bool DEFAULT false,
    PRIMARY KEY ("opening_day","vendor_id")
);

INSERT INTO "public"."addresses" ("address_id", "id", "address", "postal_code") VALUES
(1, '8b31131f-7cd4-4a51-8a54-197a59a8f3f7', 'Blk 157, Mei Ling St', '150168'),
(3, 'df652550-a839-413e-b6ba-197d0f57b0a5', 'Blk 158, Mei Ling St', '140158'),
(4, '36641177-34be-43a9-ba75-6ba6265dd4d7', '200AM', '140158'),
(5, 'f1e659a5-79b6-4ba4-8075-28bd81a200e2', 'Anson Rd', '123456'),
(6, '69a3b2ae-f3a1-4898-8ffd-0bf05ea271c7', 'Anson Rd', '123456'),
(11, 'd12583cb-86f1-458d-8596-81f855bd6be7', 'Tras St', '079027');

INSERT INTO "public"."availabilities" ("availability") VALUES
('f'),
('t');

INSERT INTO "public"."carts" ("uuid", "user_id", "total_price") VALUES
('71133c76-2707-4c82-b94e-74bfb0c422c6', 'f2f22f95-1dfb-471a-b585-e2a4e57a8696', NULL),
('76092cd7-ea40-4607-ae0d-502c17f0aea0', '8e925a0c-29db-49c5-9231-803016da59ec', 1.00),
('7d8c01e0-b78e-4765-853b-183339acacae', 'b92b8852-0f88-4367-bb50-97bfdd5307bc', NULL),
('9733617a-52d7-49d5-ab1d-8293d20e27fb', 'ce82b15b-4ea5-405c-a1fe-0cd889bee973', 1.00),
('a5621d86-1dae-4c3d-b3eb-259934eca410', 'f17c885b-3519-4870-9895-f20360eec62b', 305.00),
('d8acc131-d492-4658-bbca-182efe88ef8b', '43f24c7e-56a7-4cb7-8463-c5bba65154f1', NULL),
('dc8de102-0ad2-466b-b4d5-6ee1de54483a', 'a2584983-29ea-478c-8600-b9af4cbd7287', 1.00),
('feb14e66-a94d-441b-802f-2bf82c0683ae', '99346497-64c4-4498-b7be-8bd2842aa12c', 10.00);

INSERT INTO "public"."carts_items" ("item_id", "cart_id", "item_price", "quantity_ordered", "user_note", "is_deleted", "id") VALUES
('00321deb-3ae1-4f84-874a-c6e434069e84', '76092cd7-ea40-4607-ae0d-502c17f0aea0', 9.50, 2, 'less oil', 't', 8),
('00321deb-3ae1-4f84-874a-c6e434069e84', '76092cd7-ea40-4607-ae0d-502c17f0aea0', 9.50, 1, '', 't', 12),
('00321deb-3ae1-4f84-874a-c6e434069e84', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 9.50, 1, '', 't', 1),
('00321deb-3ae1-4f84-874a-c6e434069e84', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 9.50, 3, '', 't', 13),
('00321deb-3ae1-4f84-874a-c6e434069e84', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 9.50, 6, '', 't', 20),
('00321deb-3ae1-4f84-874a-c6e434069e84', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 9.50, 1, '', 't', 21),
('00321deb-3ae1-4f84-874a-c6e434069e84', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 9.50, 1, '', 't', 23),
('00321deb-3ae1-4f84-874a-c6e434069e84', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 9.50, 3, 'no chili', 't', 24),
('00321deb-3ae1-4f84-874a-c6e434069e84', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 9.50, 1, '', 't', 26),
('00321deb-3ae1-4f84-874a-c6e434069e84', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 9.50, 1, '', 't', 27),
('00321deb-3ae1-4f84-874a-c6e434069e84', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 9.50, 1, '', 't', 28),
('00321deb-3ae1-4f84-874a-c6e434069e84', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 9.50, 1, '', 't', 30),
('00321deb-3ae1-4f84-874a-c6e434069e84', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 9.50, 1, '', 't', 32),
('00321deb-3ae1-4f84-874a-c6e434069e84', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 9.50, 3, '', 't', 35),
('00321deb-3ae1-4f84-874a-c6e434069e84', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 9.50, 2, '', 't', 39),
('00321deb-3ae1-4f84-874a-c6e434069e84', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 9.50, 1, '', 't', 67),
('00321deb-3ae1-4f84-874a-c6e434069e84', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 9.50, 1, '', 't', 72),
('00321deb-3ae1-4f84-874a-c6e434069e84', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 9.50, 1, '', 't', 81),
('00321deb-3ae1-4f84-874a-c6e434069e84', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 9.50, 1, '', 't', 82),
('00321deb-3ae1-4f84-874a-c6e434069e84', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 9.50, 1, '', 't', 83),
('00321deb-3ae1-4f84-874a-c6e434069e84', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 9.50, 1, '', 't', 84),
('00321deb-3ae1-4f84-874a-c6e434069e84', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 9.50, 1, '', 't', 86),
('00321deb-3ae1-4f84-874a-c6e434069e84', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 9.50, 1, '', 't', 87),
('00321deb-3ae1-4f84-874a-c6e434069e84', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 9.50, 1, '', 't', 88),
('1935a0e0-c090-43e4-a8a0-4c290e9411f4', '76092cd7-ea40-4607-ae0d-502c17f0aea0', 2.00, 1, '', 't', 10),
('1935a0e0-c090-43e4-a8a0-4c290e9411f4', 'a5621d86-1dae-4c3d-b3eb-259934eca410', 2.00, 5, '', 't', 7),
('1935a0e0-c090-43e4-a8a0-4c290e9411f4', 'a5621d86-1dae-4c3d-b3eb-259934eca410', 2.00, 152, '', 'f', 9),
('1935a0e0-c090-43e4-a8a0-4c290e9411f4', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 2.00, 1, '', 't', 2),
('1935a0e0-c090-43e4-a8a0-4c290e9411f4', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 2.00, 5, '', 't', 8),
('1935a0e0-c090-43e4-a8a0-4c290e9411f4', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 2.00, 5, 'more ice', 't', 14),
('1935a0e0-c090-43e4-a8a0-4c290e9411f4', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 2.00, 2, '', 't', 16),
('1935a0e0-c090-43e4-a8a0-4c290e9411f4', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 2.00, 1, '', 't', 22),
('1935a0e0-c090-43e4-a8a0-4c290e9411f4', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 2.00, 1, '', 't', 25),
('1935a0e0-c090-43e4-a8a0-4c290e9411f4', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 2.00, 1, '', 't', 33),
('1935a0e0-c090-43e4-a8a0-4c290e9411f4', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 2.00, 1, '', 't', 34),
('1935a0e0-c090-43e4-a8a0-4c290e9411f4', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 2.00, 1, '', 't', 36),
('1935a0e0-c090-43e4-a8a0-4c290e9411f4', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 2.00, 1, 'less ice', 't', 40),
('1935a0e0-c090-43e4-a8a0-4c290e9411f4', 'feb14e66-a94d-441b-802f-2bf82c0683ae', 2.00, 5, 'less ice', 'f', 6),
('20cb8d1b-83e2-4a74-b598-2b9518543e15', '76092cd7-ea40-4607-ae0d-502c17f0aea0', 15.00, 1, '', 't', 7),
('20cb8d1b-83e2-4a74-b598-2b9518543e15', '76092cd7-ea40-4607-ae0d-502c17f0aea0', 15.00, 4, '', 't', 9),
('20cb8d1b-83e2-4a74-b598-2b9518543e15', '76092cd7-ea40-4607-ae0d-502c17f0aea0', 15.00, 1, '', 't', 11),
('24f10c27-cc45-4993-961a-39651164cf2c', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 2.00, 3, '', 't', 15),
('24f10c27-cc45-4993-961a-39651164cf2c', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 2.00, 1, '', 't', 17),
('24f10c27-cc45-4993-961a-39651164cf2c', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 2.00, 1, '', 't', 31),
('24f10c27-cc45-4993-961a-39651164cf2c', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 2.00, 1, '', 't', 37),
('24f10c27-cc45-4993-961a-39651164cf2c', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 2.00, 1, '', 't', 38),
('24f10c27-cc45-4993-961a-39651164cf2c', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 2.00, 1, '', 't', 52),
('24f10c27-cc45-4993-961a-39651164cf2c', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 2.00, 1, '', 't', 71),
('24f10c27-cc45-4993-961a-39651164cf2c', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 2.00, 1, '', 't', 78),
('24f10c27-cc45-4993-961a-39651164cf2c', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 2.00, 1, '', 't', 80),
('24f10c27-cc45-4993-961a-39651164cf2c', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 2.00, 1, '', 't', 85),
('712220d5-8fad-4d76-8ebe-3f86160b5dd1', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 6.00, 1, 'test2', 't', 62),
('712220d5-8fad-4d76-8ebe-3f86160b5dd1', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 6.00, 1, '', 't', 75),
('712220d5-8fad-4d76-8ebe-3f86160b5dd1', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 6.00, 2, '', 't', 76),
('ac2a04e8-1c55-4b04-a04f-25ba3decb230', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 2.00, 1, '', 't', 19),
('ac2a04e8-1c55-4b04-a04f-25ba3decb230', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 2.00, 2, '', 't', 56),
('ac2a04e8-1c55-4b04-a04f-25ba3decb230', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 2.00, 1, 'MORE GREEN', 't', 58),
('af76326e-c158-4665-a75d-b0fc4ee2815b', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 20.50, 1, '', 't', 3),
('af76326e-c158-4665-a75d-b0fc4ee2815b', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 20.50, 2, 'less spicy :)', 't', 53),
('af76326e-c158-4665-a75d-b0fc4ee2815b', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 20.50, 1, '', 't', 59),
('af76326e-c158-4665-a75d-b0fc4ee2815b', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 20.50, 1, '', 't', 64),
('af76326e-c158-4665-a75d-b0fc4ee2815b', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 20.50, 1, '', 't', 65),
('af76326e-c158-4665-a75d-b0fc4ee2815b', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 20.50, 1, '', 't', 66),
('af76326e-c158-4665-a75d-b0fc4ee2815b', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 20.50, 1, '', 't', 68),
('af76326e-c158-4665-a75d-b0fc4ee2815b', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 20.50, 1, '', 't', 69),
('af76326e-c158-4665-a75d-b0fc4ee2815b', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 20.50, 1, '', 't', 70),
('af76326e-c158-4665-a75d-b0fc4ee2815b', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 20.50, 1, '', 't', 74),
('c2410eef-d446-4a54-a814-88920ad560c0', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 4.50, 1, '', 't', 18),
('c2410eef-d446-4a54-a814-88920ad560c0', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 4.50, 1, '', 't', 29),
('c2410eef-d446-4a54-a814-88920ad560c0', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 4.50, 1, '', 't', 51),
('c2410eef-d446-4a54-a814-88920ad560c0', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 4.50, 1, '', 't', 54),
('c2410eef-d446-4a54-a814-88920ad560c0', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 4.50, 1, '', 't', 55),
('c2410eef-d446-4a54-a814-88920ad560c0', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 4.50, 1, 'MORE BUBBLES', 't', 57),
('c2410eef-d446-4a54-a814-88920ad560c0', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 4.50, 1, '', 't', 60),
('c2410eef-d446-4a54-a814-88920ad560c0', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 4.50, 1, 'test1', 't', 61),
('c2410eef-d446-4a54-a814-88920ad560c0', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 4.50, 1, 'test3', 't', 63),
('c2410eef-d446-4a54-a814-88920ad560c0', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 4.50, 1, 'ADD CHILI', 't', 79),
('d74ab197-34e6-4105-b616-ed9eb57e3702', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 20.00, 4, '', 't', 5),
('d74ab197-34e6-4105-b616-ed9eb57e3702', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 20.00, 1, '', 't', 41),
('d74ab197-34e6-4105-b616-ed9eb57e3702', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 20.00, 1, '', 't', 42),
('d74ab197-34e6-4105-b616-ed9eb57e3702', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 20.00, 2, '', 't', 43),
('d74ab197-34e6-4105-b616-ed9eb57e3702', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 20.00, 1, '', 't', 44),
('d74ab197-34e6-4105-b616-ed9eb57e3702', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 20.00, 1, '', 't', 45),
('d74ab197-34e6-4105-b616-ed9eb57e3702', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 20.00, 1, '', 't', 46),
('d74ab197-34e6-4105-b616-ed9eb57e3702', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 20.00, 1, '', 't', 47),
('d74ab197-34e6-4105-b616-ed9eb57e3702', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 20.00, 1, '', 't', 48),
('d74ab197-34e6-4105-b616-ed9eb57e3702', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 20.00, 1, '', 't', 49),
('d74ab197-34e6-4105-b616-ed9eb57e3702', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 20.00, 1, '', 't', 50),
('d74ab197-34e6-4105-b616-ed9eb57e3702', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 20.00, 1, '', 't', 73),
('d74ab197-34e6-4105-b616-ed9eb57e3702', 'dc8de102-0ad2-466b-b4d5-6ee1de54483a', 20.00, 1, '', 't', 77);

INSERT INTO "public"."categories" ("category") VALUES
('BUBBLE TEA'),
('CHICKEN'),
('CHINESE'),
('DESSERT'),
('HALAL'),
('HEALTHY'),
('INDIAN'),
('JAPANESE'),
('KOREAN'),
('PIZZA'),
('THAI'),
('WESTERN');

INSERT INTO "public"."item_categories" ("category", "item_id") VALUES
('Signature', '00321deb-3ae1-4f84-874a-c6e434069e84'),
('Drinks', '1935a0e0-c090-43e4-a8a0-4c290e9411f4'),
('Desserts', '20cb8d1b-83e2-4a74-b598-2b9518543e15'),
('Foods', '24f10c27-cc45-4993-961a-39651164cf2c'),
('Signature', '3af3784d-aca5-45ec-b660-411c9b970f80'),
('Foods', '55c08645-e088-4071-be64-81f88fa6a35f'),
('Foods', '603ddec1-bd59-4633-a086-6573403bd3f6'),
('Foods', '66e0c71b-0248-4bfb-b1e0-39c193185d90'),
('Foods', '6e32c822-9cd6-4a46-b9d9-55c6d58fdb32'),
('Foods', '712220d5-8fad-4d76-8ebe-3f86160b5dd1'),
('Drinks', 'ac2a04e8-1c55-4b04-a04f-25ba3decb230'),
('New Item', 'af76326e-c158-4665-a75d-b0fc4ee2815b'),
('Foods', 'c2410eef-d446-4a54-a814-88920ad560c0'),
('Signature', 'd74ab197-34e6-4105-b616-ed9eb57e3702');

INSERT INTO "public"."items" ("uuid", "availability", "vendor_id", "name", "item_price", "image_url", "description", "is_deleted") VALUES
('00321deb-3ae1-4f84-874a-c6e434069e84', 't', 'df652550-a839-413e-b6ba-197d0f57b0a5', 'Fried Rice', 9.50, 'https://burps-sei.s3.ap-southeast-1.amazonaws.com/a02688d8-683d-4d92-8547-2a17e95c8d83.jpg', 'Fragrant egg fried rice', 'f'),
('1935a0e0-c090-43e4-a8a0-4c290e9411f4', 't', 'df652550-a839-413e-b6ba-197d0f57b0a5', 'Kopi Ais', 2.00, './sample-image.webp', 'description', 'f'),
('20cb8d1b-83e2-4a74-b598-2b9518543e15', 't', 'df652550-a839-413e-b6ba-197d0f57b0a5', 'macaron', 15.00, 'https://burps-sei.s3.ap-southeast-1.amazonaws.com/de30643c-2c62-424d-8741-c653ac2c3716.jpg', 'one box of 8pcs', 'f'),
('24f10c27-cc45-4993-961a-39651164cf2c', 't', 'df652550-a839-413e-b6ba-197d0f57b0a5', 'Teh Ais', 2.00, './sample-image.webp', 'With ices', 'f'),
('3af3784d-aca5-45ec-b660-411c9b970f80', 'f', 'df652550-a839-413e-b6ba-197d0f57b0a5', 'asd', 2.00, './sample-image.webp', 'a', 't'),
('55c08645-e088-4071-be64-81f88fa6a35f', 't', 'df652550-a839-413e-b6ba-197d0f57b0a5', 'des', 2.00, './sample-image.webp', '123', 't'),
('603ddec1-bd59-4633-a086-6573403bd3f6', 't', '36641177-34be-43a9-ba75-6ba6265dd4d7', 'Ramen', 12.00, 'https://burps-sei.s3.ap-southeast-1.amazonaws.com/87d9ebbf-a613-4ba7-9b4e-efb12ae7d63a.jpg', 'spicy tobki', 'f'),
('66e0c71b-0248-4bfb-b1e0-39c193185d90', 'f', '36641177-34be-43a9-ba75-6ba6265dd4d7', 'test', 1.00, './sample-image.webp', '1', 't'),
('6e32c822-9cd6-4a46-b9d9-55c6d58fdb32', 't', 'df652550-a839-413e-b6ba-197d0f57b0a5', 'test', 1.00, './sample-image.webp', 'test', 't'),
('712220d5-8fad-4d76-8ebe-3f86160b5dd1', 't', 'df652550-a839-413e-b6ba-197d0f57b0a5', 'Chicken Rice', 6.00, './sample-image.webp', 'Hainan ji fan', 'f'),
('ac2a04e8-1c55-4b04-a04f-25ba3decb230', 't', '8b31131f-7cd4-4a51-8a54-197a59a8f3f7', 'green tea', 2.00, './sample-image.webp', 'description', 'f'),
('af76326e-c158-4665-a75d-b0fc4ee2815b', 't', 'df652550-a839-413e-b6ba-197d0f57b0a5', 'Nasi Lemak 2.0', 20.50, './sample-image.webp', 'spicyyy', 'f'),
('c2410eef-d446-4a54-a814-88920ad560c0', 't', '36641177-34be-43a9-ba75-6ba6265dd4d7', 'Golden Bubble Milk Tea', 4.50, 'https://burps-sei.s3.ap-southeast-1.amazonaws.com/b2bd9588-c3ac-4699-9a3a-f5700d0918c4.jpg', '', 'f'),
('d74ab197-34e6-4105-b616-ed9eb57e3702', 't', 'df652550-a839-413e-b6ba-197d0f57b0a5', 'Nasi Lemak Super Spicy', 20.00, './sample-image.webp', 'description', 'f'),
('f9dda8f4-1019-43e7-972e-2ef8c1edcbb8', 't', '36641177-34be-43a9-ba75-6ba6265dd4d7', 'adfs', 123.00, './sample-image.webp', '123', 'f');

INSERT INTO "public"."items_orders" ("item_id", "order_id", "item_price", "quantity_ordered", "user_note") VALUES
('00321deb-3ae1-4f84-874a-c6e434069e84', '0e9de657-b4ab-4c08-8d59-06ce951d9074', 9.50, 1, ''),
('00321deb-3ae1-4f84-874a-c6e434069e84', '11fb4e11-8528-4ec5-b227-096fa8ae8bbd', 9.50, 1, ''),
('00321deb-3ae1-4f84-874a-c6e434069e84', '1d26406c-fed4-4c79-b7bc-b31125d6c32a', 9.50, 3, 'no chili'),
('00321deb-3ae1-4f84-874a-c6e434069e84', '2077da50-5804-4de0-a123-91fbc9b75f18', 9.50, 1, ''),
('00321deb-3ae1-4f84-874a-c6e434069e84', '3e0a6b0e-b4f9-4fba-ae2c-7b34db5a01cc', 9.50, 1, ''),
('00321deb-3ae1-4f84-874a-c6e434069e84', '71297803-f29f-47e9-bbb4-4f6fbde629f7', 9.50, 1, ''),
('00321deb-3ae1-4f84-874a-c6e434069e84', '7e8cb9e7-d51e-41a0-8e7a-06f5425933cc', 9.50, 1, ''),
('00321deb-3ae1-4f84-874a-c6e434069e84', '81877b49-93b1-4476-9208-f17c04b23dc9', 9.50, 2, 'less oil'),
('00321deb-3ae1-4f84-874a-c6e434069e84', '92eef38e-7169-4ec2-b315-38e67d05ce93', 9.50, 1, ''),
('00321deb-3ae1-4f84-874a-c6e434069e84', 'ee5f93f5-cfc7-4cc1-b488-d62d51d19c76', 9.50, 1, ''),
('00321deb-3ae1-4f84-874a-c6e434069e84', 'f808ac6c-75b9-40a1-b89d-dad45926216a', 9.50, 1, ''),
('1935a0e0-c090-43e4-a8a0-4c290e9411f4', '1d26406c-fed4-4c79-b7bc-b31125d6c32a', 2.00, 1, ''),
('1935a0e0-c090-43e4-a8a0-4c290e9411f4', '8cc2248c-49d5-4eb3-8522-913b28dbe52f', 2.00, 1, ''),
('1935a0e0-c090-43e4-a8a0-4c290e9411f4', 'b04a3c36-fc4e-4bc8-bb33-6b5709a3381f', 2.00, 5, ''),
('1935a0e0-c090-43e4-a8a0-4c290e9411f4', 'e8209875-4731-40a1-bdeb-bd1c8d87c66c', 2.00, 150, ''),
('1935a0e0-c090-43e4-a8a0-4c290e9411f4', 'f0ba6581-fa67-4ef9-8b88-9e10e679d3f7', 2.00, 5, 'less ice'),
('20cb8d1b-83e2-4a74-b598-2b9518543e15', '3e0a6b0e-b4f9-4fba-ae2c-7b34db5a01cc', 15.00, 1, ''),
('20cb8d1b-83e2-4a74-b598-2b9518543e15', '81877b49-93b1-4476-9208-f17c04b23dc9', 15.00, 4, ''),
('24f10c27-cc45-4993-961a-39651164cf2c', '5b062874-bdac-4733-8190-b8439789cbf9', 2.00, 1, ''),
('24f10c27-cc45-4993-961a-39651164cf2c', '71297803-f29f-47e9-bbb4-4f6fbde629f7', 2.00, 1, ''),
('24f10c27-cc45-4993-961a-39651164cf2c', 'aef4ec6f-3d66-4366-baaf-c9471fd0688f', 2.00, 1, ''),
('712220d5-8fad-4d76-8ebe-3f86160b5dd1', '46e1fd98-63d3-40a7-af61-7fb00d1c4a72', 6.00, 1, 'test2'),
('ac2a04e8-1c55-4b04-a04f-25ba3decb230', '4f09bca4-5cb6-4e56-987b-b0d156588dbd', 2.00, 1, 'MORE GREEN'),
('ac2a04e8-1c55-4b04-a04f-25ba3decb230', '72350042-5377-4ca3-adac-0748981c48d4', 2.00, 2, ''),
('af76326e-c158-4665-a75d-b0fc4ee2815b', '44f2b22a-976c-4652-8075-a73a0e79fc73', 20.50, 2, 'less spicy :)'),
('af76326e-c158-4665-a75d-b0fc4ee2815b', '513b87e0-9082-43ed-b07e-19ba98497df0', 20.50, 1, ''),
('c2410eef-d446-4a54-a814-88920ad560c0', 'd553260a-7db1-4554-b42c-706a234d386e', 4.50, 1, 'ADD CHILI'),
('c2410eef-d446-4a54-a814-88920ad560c0', 'f24ff62e-8097-4fc2-855a-ee5bcd8ebf54', 4.50, 1, 'test3'),
('c2410eef-d446-4a54-a814-88920ad560c0', 'fb7eb7d6-bbfd-4b09-8d3d-2f1093525d6e', 4.50, 1, 'test1'),
('d74ab197-34e6-4105-b616-ed9eb57e3702', '5b062874-bdac-4733-8190-b8439789cbf9', 20.00, 1, ''),
('d74ab197-34e6-4105-b616-ed9eb57e3702', 'b04a3c36-fc4e-4bc8-bb33-6b5709a3381f', 20.00, 2, ''),
('d74ab197-34e6-4105-b616-ed9eb57e3702', 'b1f7cc39-501a-4d7f-82dd-dc2449427169', 20.00, 1, '');

INSERT INTO "public"."opening_days" ("opening_day") VALUES
('FRIDAY'),
('MONDAY'),
('SATURDAY'),
('SUNDAY'),
('THURSDAY'),
('TUESDAY'),
('WEDNESDAY');

INSERT INTO "public"."orders" ("uuid", "user_id", "vendor_id", "status", "rating", "total_price", "review", "date", "time", "is_active") VALUES
('0e9de657-b4ab-4c08-8d59-06ce951d9074', 'a2584983-29ea-478c-8600-b9af4cbd7287', 'df652550-a839-413e-b6ba-197d0f57b0a5', 'CANCELLED', NULL, 10.50, NULL, '2023-09-14', '23:56:16.222507', 'f'),
('11fb4e11-8528-4ec5-b227-096fa8ae8bbd', 'a2584983-29ea-478c-8600-b9af4cbd7287', 'df652550-a839-413e-b6ba-197d0f57b0a5', 'CANCELLED', NULL, 10.50, NULL, '2023-09-15', '00:17:31.767485', 'f'),
('1d26406c-fed4-4c79-b7bc-b31125d6c32a', 'a2584983-29ea-478c-8600-b9af4cbd7287', 'df652550-a839-413e-b6ba-197d0f57b0a5', 'COMPLETED', NULL, 31.50, 'Test after update controller', '2023-09-11', '23:14:58.777449', 'f'),
('2077da50-5804-4de0-a123-91fbc9b75f18', 'a2584983-29ea-478c-8600-b9af4cbd7287', 'df652550-a839-413e-b6ba-197d0f57b0a5', 'CANCELLED', NULL, 10.50, NULL, '2023-09-15', '00:24:33.457782', 'f'),
('29a8dfc0-bc46-4f03-8f17-19f3ea0ae3db', 'a2584983-29ea-478c-8600-b9af4cbd7287', 'df652550-a839-413e-b6ba-197d0f57b0a5', 'SENT', NULL, 10.50, NULL, '2023-09-15', '00:14:53.057054', 't'),
('3e0a6b0e-b4f9-4fba-ae2c-7b34db5a01cc', '8e925a0c-29db-49c5-9231-803016da59ec', 'df652550-a839-413e-b6ba-197d0f57b0a5', 'COMPLETED', 5.0, 25.50, 'VERY DELICIOUSSS !!!', '2023-09-15', '02:33:36.029545', 'f'),
('44f2b22a-976c-4652-8075-a73a0e79fc73', 'a2584983-29ea-478c-8600-b9af4cbd7287', 'df652550-a839-413e-b6ba-197d0f57b0a5', 'COMPLETED', 1.5, 42.00, 'Too spicy!! Vendor didnt prepare according to my remark!', '2023-09-13', '02:52:36.117658', 'f'),
('46e1fd98-63d3-40a7-af61-7fb00d1c4a72', 'a2584983-29ea-478c-8600-b9af4cbd7287', 'df652550-a839-413e-b6ba-197d0f57b0a5', 'COMPLETED', NULL, 7.00, NULL, '2023-09-13', '13:36:24.926905', 'f'),
('4f09bca4-5cb6-4e56-987b-b0d156588dbd', 'a2584983-29ea-478c-8600-b9af4cbd7287', '8b31131f-7cd4-4a51-8a54-197a59a8f3f7', 'COMPLETED', NULL, 3.00, NULL, '2023-09-13', '11:23:24.980057', 'f'),
('513b87e0-9082-43ed-b07e-19ba98497df0', 'a2584983-29ea-478c-8600-b9af4cbd7287', 'df652550-a839-413e-b6ba-197d0f57b0a5', 'COMPLETED', NULL, 21.50, NULL, '2023-09-15', '00:48:48.274079', 'f'),
('5b062874-bdac-4733-8190-b8439789cbf9', 'a2584983-29ea-478c-8600-b9af4cbd7287', 'df652550-a839-413e-b6ba-197d0f57b0a5', 'CANCELLED', NULL, 23.00, NULL, '2023-09-13', '15:48:51.972681', 'f'),
('71297803-f29f-47e9-bbb4-4f6fbde629f7', 'a2584983-29ea-478c-8600-b9af4cbd7287', 'df652550-a839-413e-b6ba-197d0f57b0a5', 'COMPLETED', NULL, 12.50, NULL, '2023-09-13', '15:23:39.469155', 'f'),
('72350042-5377-4ca3-adac-0748981c48d4', 'a2584983-29ea-478c-8600-b9af4cbd7287', '8b31131f-7cd4-4a51-8a54-197a59a8f3f7', 'COMPLETED', 5.0, 5.00, 'nice green tea ~', '2023-09-13', '09:43:33.226263', 'f'),
('7e8cb9e7-d51e-41a0-8e7a-06f5425933cc', 'a2584983-29ea-478c-8600-b9af4cbd7287', 'df652550-a839-413e-b6ba-197d0f57b0a5', 'CANCELLED', NULL, 10.50, NULL, '2023-09-15', '00:01:37.69612', 'f'),
('8155fa01-2079-4246-87ad-7318c05da57f', 'a2584983-29ea-478c-8600-b9af4cbd7287', 'df652550-a839-413e-b6ba-197d0f57b0a5', 'SENT', NULL, 10.50, NULL, '2023-09-14', '23:54:40.607318', 't'),
('81877b49-93b1-4476-9208-f17c04b23dc9', '8e925a0c-29db-49c5-9231-803016da59ec', 'df652550-a839-413e-b6ba-197d0f57b0a5', 'CANCELLED', NULL, 80.00, NULL, '2023-09-15', '02:32:43.36722', 'f'),
('8cc2248c-49d5-4eb3-8522-913b28dbe52f', 'a2584983-29ea-478c-8600-b9af4cbd7287', 'df652550-a839-413e-b6ba-197d0f57b0a5', 'CANCELLED', NULL, 3.00, NULL, '2023-09-15', '00:45:57.29608', 'f'),
('92eef38e-7169-4ec2-b315-38e67d05ce93', 'a2584983-29ea-478c-8600-b9af4cbd7287', 'df652550-a839-413e-b6ba-197d0f57b0a5', 'CANCELLED', NULL, 10.50, NULL, '2023-09-15', '00:44:43.89644', 'f'),
('aef4ec6f-3d66-4366-baaf-c9471fd0688f', 'a2584983-29ea-478c-8600-b9af4cbd7287', 'df652550-a839-413e-b6ba-197d0f57b0a5', 'CANCELLED', NULL, 3.00, NULL, '2023-09-14', '23:53:37.579494', 'f'),
('b04a3c36-fc4e-4bc8-bb33-6b5709a3381f', 'a2584983-29ea-478c-8600-b9af4cbd7287', 'df652550-a839-413e-b6ba-197d0f57b0a5', 'COMPLETED', 3.5, 50.00, 'some review', '2023-09-06', '10:24:51.084978', 'f'),
('b1f7cc39-501a-4d7f-82dd-dc2449427169', 'a2584983-29ea-478c-8600-b9af4cbd7287', 'df652550-a839-413e-b6ba-197d0f57b0a5', 'COMPLETED', 5.0, 21.00, NULL, '2023-09-11', '17:40:07.928019', 'f'),
('d553260a-7db1-4554-b42c-706a234d386e', 'a2584983-29ea-478c-8600-b9af4cbd7287', '36641177-34be-43a9-ba75-6ba6265dd4d7', 'CANCELLED', NULL, 5.50, NULL, '2023-09-13', '15:57:50.338722', 'f'),
('e8209875-4731-40a1-bdeb-bd1c8d87c66c', 'f17c885b-3519-4870-9895-f20360eec62b', 'df652550-a839-413e-b6ba-197d0f57b0a5', 'CANCELLED', NULL, 301.00, NULL, '2023-09-06', '23:31:39.995246', 't'),
('ee5f93f5-cfc7-4cc1-b488-d62d51d19c76', 'a2584983-29ea-478c-8600-b9af4cbd7287', 'df652550-a839-413e-b6ba-197d0f57b0a5', 'CANCELLED', NULL, 10.50, NULL, '2023-09-15', '00:04:17.758506', 'f'),
('f0ba6581-fa67-4ef9-8b88-9e10e679d3f7', '99346497-64c4-4498-b7be-8bd2842aa12c', 'df652550-a839-413e-b6ba-197d0f57b0a5', 'CANCELLED', NULL, 11.00, NULL, '2023-09-06', '13:31:08.566139', 't'),
('f24ff62e-8097-4fc2-855a-ee5bcd8ebf54', 'a2584983-29ea-478c-8600-b9af4cbd7287', '36641177-34be-43a9-ba75-6ba6265dd4d7', 'CANCELLED', 1.0, 5.50, 'CANCELLED MA ORDERRR', '2023-09-13', '13:38:53.828052', 'f'),
('f808ac6c-75b9-40a1-b89d-dad45926216a', 'a2584983-29ea-478c-8600-b9af4cbd7287', 'df652550-a839-413e-b6ba-197d0f57b0a5', 'CANCELLED', NULL, 10.50, NULL, '2023-09-15', '00:20:19.44767', 'f'),
('fb7eb7d6-bbfd-4b09-8d3d-2f1093525d6e', 'a2584983-29ea-478c-8600-b9af4cbd7287', '36641177-34be-43a9-ba75-6ba6265dd4d7', 'COMPLETED', 2.5, 5.50, 'meh...', '2023-09-13', '13:35:22.014121', 'f');

INSERT INTO "public"."roles" ("role") VALUES
('ADMIN'),
('CUSTOMER'),
('VENDOR');

INSERT INTO "public"."statuses" ("status") VALUES
('CANCELLED'),
('COMPLETED'),
('DELIVERING'),
('PREPARING'),
('SENT');

INSERT INTO "public"."types" ("type") VALUES
('ACCESS'),
('REFRESH');

INSERT INTO "public"."user_details" ("user_id", "first_name", "last_name") VALUES
('43f24c7e-56a7-4cb7-8463-c5bba65154f1', 'shibaaa', 'inuuu'),
('8e925a0c-29db-49c5-9231-803016da59ec', 'Abi', '3'),
('99346497-64c4-4498-b7be-8bd2842aa12c', 'Shiba', 'Inu'),
('a2584983-29ea-478c-8600-b9af4cbd7287', 'Desmondd', 'Tong'),
('b92b8852-0f88-4367-bb50-97bfdd5307bc', 'test', '1'),
('ce82b15b-4ea5-405c-a1fe-0cd889bee973', 'Desmond', 'Lim'),
('f17c885b-3519-4870-9895-f20360eec62b', 'Doggo', 'Inu'),
('f2f22f95-1dfb-471a-b585-e2a4e57a8696', 'test', '2');

INSERT INTO "public"."users" ("uuid", "role", "email", "password", "contact", "is_deleted") VALUES
('36641177-34be-43a9-ba75-6ba6265dd4d7', 'VENDOR', 'desmond3_vendor@test.com', '$2b$05$3VN6tty6mPrsNxKA0FREV.TVXTGQvMM3AaQsSsWfQjxVkMJfTLVHG', '96423462', 'f'),
('43f24c7e-56a7-4cb7-8463-c5bba65154f1', 'CUSTOMER', 'shibe@test.com', '$2b$05$uS34DMmuiTIEr8kIE.d6P.92vW7GtgIkWlx4ruLslmU8Jhkv1GBU2', '12345678', 'f'),
('69a3b2ae-f3a1-4898-8ffd-0bf05ea271c7', 'VENDOR', 'test4@test.com', '$2b$05$ouDmTgqlivqVF8xUF68heurQwglhclj4qq6mYl7QoHT7I1zm690Ia', '12345678', 'f'),
('8b31131f-7cd4-4a51-8a54-197a59a8f3f7', 'VENDOR', 'desmond_vendor@test.com', '$2b$05$oAQ/AA5PmR2.qaTJBDRV3OvbaBcytcPtbCAmdpuQlZcaa2zYL0xFO', '96423462', 'f'),
('8e925a0c-29db-49c5-9231-803016da59ec', 'CUSTOMER', 'test3@test.com', '$2b$05$NKnAnn7AlO6wX54ZVqixX.ynZbkZvwXy0ya5lzbPrej7CIsjMxYCO', '12345678', 'f'),
('99346497-64c4-4498-b7be-8bd2842aa12c', 'CUSTOMER', 'shiba@test.com', '$2b$05$F0KN5UFRzhcr79FOctanZ.rZanZMliXgJiEFxCkSV1050YU72mNh.', '98765432', 'f'),
('a2584983-29ea-478c-8600-b9af4cbd7287', 'CUSTOMER', 'desmond@test.com', '$2b$05$rw0/8aJ62iTyFBQ7QhI/Euq8xhZS.549bdPoYK73APN5nrCTwakEq', '12345678', 'f'),
('b92b8852-0f88-4367-bb50-97bfdd5307bc', 'CUSTOMER', 'test1@test.com', '$2b$05$PTLoc4EgMpRxhkl/sQELDefXFt1uNsU593OjTDibTYBZXsHkegta6', '12345678', 'f'),
('ce82b15b-4ea5-405c-a1fe-0cd889bee973', 'CUSTOMER', 'desmondlim@test.com', '$2b$05$73Eu7nbzus4zJrUVpP0FU.ZQYK.xm2tHGka5637aIPrIU6CIbVrVS', '12345678', 'f'),
('d12583cb-86f1-458d-8596-81f855bd6be7', 'VENDOR', 'peeseyy@test.com', '$2b$05$RHYV1RtoDyfziH9OAI2ODuyFv3b81wXqyvIYf5IJa0AYWXDKyY1cK', '12345678', 'f'),
('df652550-a839-413e-b6ba-197d0f57b0a5', 'VENDOR', 'desmond2_vendor@test.com', '$2b$05$KMNHFzM6fbuRwBsj9S.mfenFno/IHsszRloSJqyjE0kO1Dacd/GTO', '96423462', 'f'),
('f17c885b-3519-4870-9895-f20360eec62b', 'CUSTOMER', 'doggo@test.com', '$2b$05$s54Ji4HZLGD5Lyj54vuGk.eQJ89cqc3wQU2yJnPhct0WFLFOcaUoq', '98765432', 'f'),
('f1e659a5-79b6-4ba4-8075-28bd81a200e2', 'VENDOR', 'testvendor@test.com', '$2b$05$OyAM3ZrjVNPKT2cPjETSYuzayNdzV58g8CpMELP0ZSQKL/Dp5hGNi', '12345678', 'f'),
('f2f22f95-1dfb-471a-b585-e2a4e57a8696', 'CUSTOMER', 'test2@test.com', '$2b$05$75OScBNmB6gvo1jgSp16t.x0k5ZxACXjr90/srIADFYI/gDrsnL6i', '12345678', 'f');

INSERT INTO "public"."vendor_details" ("vendor_id", "category", "store_name", "description", "rating", "image_url") VALUES
('36641177-34be-43a9-ba75-6ba6265dd4d7', 'BUBBLE TEA', 'KOY', NULL, 1.8, 'https://burps-sei.s3.ap-southeast-1.amazonaws.com/10d30201-d1b2-43dc-8e68-f94ca0ba6cc3.jpg'),
('69a3b2ae-f3a1-4898-8ffd-0bf05ea271c7', 'CHINESE', 'HDL', NULL, NULL, NULL),
('8b31131f-7cd4-4a51-8a54-197a59a8f3f7', 'HALAL', 'Shibanunu Cafe', 'Cafe that sells Shibanunu', NULL, NULL),
('d12583cb-86f1-458d-8596-81f855bd6be7', 'CHINESE', 'Pee-S-Eyy', NULL, NULL, NULL),
('df652550-a839-413e-b6ba-197d0f57b0a5', 'HALAL', 'ALI BABA', NULL, 3.8, NULL),
('f1e659a5-79b6-4ba4-8075-28bd81a200e2', 'KOREAN', '5fingers', NULL, NULL, NULL);

INSERT INTO "public"."vendor_operatings" ("opening_day", "vendor_id", "opening_time", "closing_time", "is_deleted") VALUES
('FRIDAY', '8b31131f-7cd4-4a51-8a54-197a59a8f3f7', '08:00:00', '23:30:00', 't'),
('MONDAY', '8b31131f-7cd4-4a51-8a54-197a59a8f3f7', '13:00:00', '14:00:00', 'f'),
('SATURDAY', '8b31131f-7cd4-4a51-8a54-197a59a8f3f7', '08:00:00', '23:30:00', 'f'),
('THURSDAY', '8b31131f-7cd4-4a51-8a54-197a59a8f3f7', '08:00:00', '17:00:00', 't'),
('TUESDAY', '8b31131f-7cd4-4a51-8a54-197a59a8f3f7', '08:00:00', '18:00:00', 'f'),
('WEDNESDAY', '8b31131f-7cd4-4a51-8a54-197a59a8f3f7', '00:00:00', '00:00:00', 'f');

ALTER TABLE "public"."addresses" ADD FOREIGN KEY ("id") REFERENCES "public"."users"("uuid");
ALTER TABLE "public"."carts" ADD FOREIGN KEY ("user_id") REFERENCES "public"."users"("uuid");
ALTER TABLE "public"."carts_items" ADD FOREIGN KEY ("item_id") REFERENCES "public"."items"("uuid");
ALTER TABLE "public"."carts_items" ADD FOREIGN KEY ("cart_id") REFERENCES "public"."carts"("uuid");
ALTER TABLE "public"."item_categories" ADD FOREIGN KEY ("item_id") REFERENCES "public"."items"("uuid");
ALTER TABLE "public"."items" ADD FOREIGN KEY ("availability") REFERENCES "public"."availabilities"("availability");
ALTER TABLE "public"."items" ADD FOREIGN KEY ("vendor_id") REFERENCES "public"."users"("uuid");
ALTER TABLE "public"."items_orders" ADD FOREIGN KEY ("item_id") REFERENCES "public"."items"("uuid");
ALTER TABLE "public"."items_orders" ADD FOREIGN KEY ("order_id") REFERENCES "public"."orders"("uuid");
ALTER TABLE "public"."orders" ADD FOREIGN KEY ("vendor_id") REFERENCES "public"."users"("uuid");
ALTER TABLE "public"."orders" ADD FOREIGN KEY ("status") REFERENCES "public"."statuses"("status");
ALTER TABLE "public"."orders" ADD FOREIGN KEY ("user_id") REFERENCES "public"."users"("uuid");
ALTER TABLE "public"."user_details" ADD FOREIGN KEY ("user_id") REFERENCES "public"."users"("uuid");
ALTER TABLE "public"."users" ADD FOREIGN KEY ("role") REFERENCES "public"."roles"("role");
ALTER TABLE "public"."vendor_details" ADD FOREIGN KEY ("category") REFERENCES "public"."categories"("category");
ALTER TABLE "public"."vendor_details" ADD FOREIGN KEY ("vendor_id") REFERENCES "public"."users"("uuid");
ALTER TABLE "public"."vendor_operatings" ADD FOREIGN KEY ("opening_day") REFERENCES "public"."opening_days"("opening_day");
ALTER TABLE "public"."vendor_operatings" ADD FOREIGN KEY ("opening_day") REFERENCES "public"."opening_days"("opening_day");
ALTER TABLE "public"."vendor_operatings" ADD FOREIGN KEY ("vendor_id") REFERENCES "public"."vendor_details"("vendor_id");
