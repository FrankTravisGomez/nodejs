USE mjrna_db;
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    discord_name VARCHAR(100),
    vr_chat_name VARCHAR(100),
    email_verified BOOLEAN NOT NULL DEFAULT false,
    receive_updates BOOLEAN NOT NULL DEFAULT true,
    password_hash VARCHAR(255) NOT NULL,
    reset_token VARCHAR(255),
    reset_token_expiry TIMESTAMP,
    is_admin BOOLEAN NOT NULL DEFAULT false
);
CREATE TABLE digital_assets (
    asset_id INT AUTO_INCREMENT PRIMARY KEY,
    asset_name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    download_link VARCHAR(255),
    is_active BOOLEAN NOT NULL DEFAULT true
);
CREATE TABLE purchases(
    purchase_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL ,
    asset_id INT NOT NULL,
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    purchase_status VARCHAR(20) NOT NULL DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (asset_id) REFERENCES digital_assets(asset_id)
);
CREATE TABLE payment_options(
    option_id INT AUTO_INCREMENT PRIMARY KEY,
    option_name VARCHAR(50) NOT NULL
);
CREATE TABLE tos_agreements(
    agreement_id INT AUTO_INCREMENT PRIMARY KEY,
    agreement_text TEXT NOT NULL
);
CREATE TABLE user_tos_agreements(
    user_id INT NOT NULL,
    agreement_id INT NOT NULL,
    PRIMARY KEY (user_id, agreement_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (agreement_id) REFERENCES tos_agreements(agreement_id)
);
CREATE TABLE wishlist(
    wishlist_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    asset_id INT NOT NULL,
    added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (asset_id) REFERENCES digital_assets (asset_id)
);
CREATE TABLE reviews(
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    asset_id INT NOT NULL,
    rating INT NOT NULL,
    comment TEXT,
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (asset_id) REFERENCES digital_assets(asset_id)
);
CREATE TABLE categories(
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL
);
CREATE TABLE asset_categories(
    asset_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (asset_id, category_id),
    FOREIGN KEY (asset_id) REFERENCES digital_assets(asset_id),
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);
CREATE TABLE discount_codes(
    code_id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(20) NOT NULL,
    discount_percentage DECIMAL(5,2) NOT NULL,
    expiration_date DATE NOT NULL
);
CREATE TABLE user_discount_codes(
    user_id INT NOT NULL,
    code_id INT NOT NULL,
    PRIMARY KEY (user_id, code_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (code_id) REFERENCES discount_codes(code_id)
);
CREATE TABLE licensing_options(
    option_id INT AUTO_INCREMENT PRIMARY KEY,
    option_name VARCHAR(50) NOT NULL
);
CREATE TABLE asset_licensing(
    asset_id INT NOT NULL,
    option_id INT NOT NULL,
    PRIMARY KEY (asset_id, option_id),
    FOREIGN KEY (asset_id) REFERENCES digital_assets(asset_id),
    FOREIGN KEY (option_id) REFERENCES licensing_options(option_id)
);