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
                                is_active BOOLEAN NOT NULL DEFAULT true
);
CREATE TABLE purchases(
    purchase_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL ,
    asset_id INT NOT NULL,
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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
    PRIMARY KEY KEY(user_id, agreement_id),
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