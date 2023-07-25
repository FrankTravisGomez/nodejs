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
