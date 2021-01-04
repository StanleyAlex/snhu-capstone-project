DROP TABLE `inc-info`.`user`;

CREATE TABLE `inc-info`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(45) NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(45) NULL,
  `address` VARCHAR(200) NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_name_UNIQUE` (`user_name` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);

  DROP TABLE `inc-info`.`user_preference`;

  CREATE TABLE `inc-info`.`user_preference` (
    `user_preference_id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `locations` VARCHAR(45) NOT NULL,
    `send_text` TINYINT(1) NOT NULL,
    `send_email` TINYINT(1) NOT NULL,
    PRIMARY KEY (`user_preference_id`),
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE);

  DROP TABLE `inc-info`.`user_incident`;

  CREATE TABLE `inc-info`.`user_incident` (
    `user_incident_id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `location` VARCHAR(5) NOT NULL,
    `incident_description` VARCHAR(2000) NOT NULL,
    PRIMARY KEY (`user_incident_id`),
    FOREIGN KEY (user_id) REFERENCES user(user_id));