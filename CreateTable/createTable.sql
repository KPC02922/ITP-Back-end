CREATE TABLE `umbrella_rental_sf_express` (
      `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
      `regionCode` VARCHAR(25) NOT NULL,
      `districtCode` VARCHAR(25) NOT NULL,
      `code` VARCHAR(25) NOT NULL,
      `location` VARCHAR(100),
      `weekDayOfficeHours` VARCHAR(25) NOT NULL,
      `satOfficeHours` VARCHAR(25) NOT NULL,
      `sunHolidayOfficeHours` VARCHAR(25) NOT NULL,
      `latitude` double NOT NULL,
      `longitude` double NOT NULL,
      `status` VARCHAR(1) NOT NULL,
      `lastUpdateTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf32;

CREATE TABLE `umbrella_rental_hk_jockey_club` (
      `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
      `regionCode` VARCHAR(25) NOT NULL,
      `districtCode` VARCHAR(25) NOT NULL,
      `location` VARCHAR(100),
      `officeHours` VARCHAR(255) NOT NULL,
      `latitude` double NOT NULL,
      `longitude` double NOT NULL,
      `status` VARCHAR(1) NOT NULL,
      `lastUpdateTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf32;

CREATE TABLE `umbrella_rental_other` (
      `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
      `regionCode` VARCHAR(25) NOT NULL,
      `districtCode` VARCHAR(25) NOT NULL,
      `address` VARCHAR(25) NOT NULL,
      `storeName` VARCHAR(25) NOT NULL,
      `officeHours` VARCHAR(25) NOT NULL,
      `latitude` double NOT NULL,
      `longitude` double NOT NULL,
      `status` VARCHAR(1) NOT NULL,
      `lastUpdateTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf32;

CREATE TABLE `rainfall_report` (
      `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
      `regionCode` VARCHAR(25) NOT NULL,
      `districtCode` VARCHAR(25) NOT NULL,
      `location` VARCHAR(100),
      `postTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      `rate` int NOT NULL,
      `latitude` double NOT NULL,
      `longitude` double NOT NULL,
      `status` VARCHAR(1) NOT NULL,
      `updateTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf32;

CREATE TABLE `flooding_report` (
      `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
      `regionCode` VARCHAR(25) NOT NULL,
      `districtCode` VARCHAR(25) NOT NULL,
      `location` VARCHAR(100),
      `postTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      `latitude` double NOT NULL,
      `longitude` double NOT NULL,
      `status` VARCHAR(1) NOT NULL,
      `updateTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf32;
