-- constraint tables
CREATE TABLE types (
	type TEXT PRIMARY KEY
);

INSERT INTO types VALUES('ACCESS');
INSERT INTO types VALUES('REFRESH');

CREATE TABLE roles (
	role TEXT PRIMARY KEY
);

INSERT INTO roles VALUES('CUSTOMER');
INSERT INTO roles VALUES('VENDOR');
INSERT INTO roles VALUES('ADMIN');

CREATE TABLE categories (
	category TEXT PRIMARY KEY
);

INSERT INTO categories VALUES('WESTERN');
INSERT INTO categories VALUES('JAPANESE');
INSERT INTO categories VALUES('BUBBLE TEA');
INSERT INTO categories VALUES('PIZZA');
INSERT INTO categories VALUES('HALAL');
INSERT INTO categories VALUES('DESSERT');
INSERT INTO categories VALUES('KOREAN');
INSERT INTO categories VALUES('HEALTHY');
INSERT INTO categories VALUES('INDIAN');
INSERT INTO categories VALUES('THAI');
INSERT INTO categories VALUES('CHICKEN');
INSERT INTO categories VALUES('CHINESE');

CREATE TABLE opening_days (
	opening_day TEXT PRIMARY KEY
);

INSERT INTO opening_days VALUES ('MONDAY');
INSERT INTO opening_days VALUES ('TUESDAY');
INSERT INTO opening_days VALUES ('WEDNESDAY');
INSERT INTO opening_days VALUES ('THURSDAY');
INSERT INTO opening_days VALUES ('FRIDAY');
INSERT INTO opening_days VALUES ('SATURDAY');
INSERT INTO opening_days VALUES ('SUNDAY');

CREATE TABLE availabilities (
	availability BOOLEAN PRIMARY KEY
);

INSERT INTO availabilities VALUES (TRUE);
INSERT INTO availabilities VALUES (FALSE);

CREATE TABLE statuses (
	status TEXT PRIMARY KEY
);

INSERT INTO statuses VALUES('CONFIRMED');
INSERT INTO statuses VALUES('PREPARING');
INSERT INTO statuses VALUES('DELIVERING');
INSERT INTO statuses VALUES('CANCELLED');
INSERT INTO statuses VALUES('COMPLETED');

CREATE TABLE ratings (
	rating DECIMAL(2,1) PRIMARY KEY
);


-- main tables
CREATE TABLE users (
	uuid uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
	role TEXT,
	email TEXT NOT NULL,
	password TEXT NOT NULL,
	contact CHAR(8) NOT NULL,
	isDeleted BOOLEAN,
	CONSTRAINT fk_role FOREIGN KEY(role) REFERENCES roles(role)
);


CREATE TABLE user_details (
	user_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(uuid)
);

CREATE TABLE addresses (
	address_id SMALLSERIAL PRIMARY KEY NOT NULL, 
	id uuid NOT NULL,
	address TEXT NOT NULL,
	postal_code CHAR(6) NOT NULL,
	CONSTRAINT fk_id FOREIGN KEY (id) REFERENCES users(uuid)
);

CREATE TABLE vendor_details (
	vendor_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	category TEXT NOT NULL,
	store_name VARCHAR(50) NOT NULL,
	description TEXT,
	CONSTRAINT fk_id FOREIGN KEY (vendor_id) REFERENCES users(uuid),
	CONSTRAINT fk_category FOREIGN KEY (category) REFERENCES categories(category)
);

CREATE TABLE vendor_operatings (
    opening_day TEXT NOT NULL,
    vendor_id uuid NOT NULL,
    opening_time TIME NOT NULL,
    closing_time TIME NOT NULL,
    CONSTRAINT pk_vendor_operatings PRIMARY KEY (opening_day, vendor_id), -- Composite primary key
    CONSTRAINT fk_opening_day FOREIGN KEY (opening_day) REFERENCES opening_days (opening_day),
    CONSTRAINT fk_vendor_id FOREIGN KEY (vendor_id) REFERENCES vendor_details (vendor_id)
);


CREATE TABLE carts (
	uuid uuid DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	user_id uuid NOT NULL,
	total_price DECIMAL(10,2),
	CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(uuid)
);

CREATE TABLE items (
	uuid uuid DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	availbility BOOLEAN NOT NULL,
	category TEXT NOT NULL,
	vendor_id uuid NOT NULL,
	name TEXT NOT NULL,
	item_price DECIMAL(10,2) NOT NULL,
	image_url TEXT,
	description TEXT,
	CONSTRAINT fk_category FOREIGN KEY (category) REFERENCES categories (category),
	CONSTRAINT fk_vendor_id FOREIGN KEY (vendor_id) REFERENCES users (uuid)
);

CREATE TABLE carts_items (
	item_id uuid NOT NULL,
	cart_id uuid NOT NULL,
	item_price DECIMAL(10,2) NOT NULL,
	quantity_ordered SMALLINT NOT NULL DEFAULT 1,
	user_note TEXT,
	CONSTRAINT pk_carts_items PRIMARY KEY (item_id, cart_id), -- Composite primary key
    CONSTRAINT fk_item_id FOREIGN KEY (item_id) REFERENCES items (uuid),
    CONSTRAINT fk_cart_id FOREIGN KEY (cart_id) REFERENCES carts (uuid)
);


CREATE TABLE orders (
	uuid uuid DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	user_id uuid NOT NULL,
	vendor_id uuid NOT NULL,
	status TEXT NOT NULL,
	rating DECIMAL(2,1),
	total_price DECIMAL(10,2) NOT NULL,
	review TEXT,
	date DATE NOT NULL,
	time TIME NOT NULL,
	CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (uuid),
	CONSTRAINT fk_vendor_id FOREIGN KEY (vendor_id) REFERENCES users (uuid),
	CONSTRAINT fk_status FOREIGN KEY (status) REFERENCES statuses (status)
);

CREATE TABLE items_orders (
	item_id uuid NOT NULL,
	order_id uuid NOT NULL,
	item_price DECIMAL(10,2) NOT NULL,
	quantity_ordered SMALLINT NOT NULL,
	user_note TEXT,
	CONSTRAINT pk_items_orders PRIMARY KEY (item_id, order_id), -- Composite primary key
    CONSTRAINT fk_item_id FOREIGN KEY (item_id) REFERENCES items (uuid),
    CONSTRAINT fk_order_id FOREIGN KEY (order_id) REFERENCES orders (uuid)
);
