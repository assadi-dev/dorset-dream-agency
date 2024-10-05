CREATE TABLE `photos` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`original_name` varchar(255),
	`size` int,
	`mime_type` varchar(255),
	`url` varchar(255),
	`created_at` timestamp NOT NULL ,
	`updated_at` timestamp NOT NULL  ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `photos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`username` varchar(255),
	`password` varchar(255),
	`avatar` varchar(255),
	`role` enum('user','admin'),
	`created_at` timestamp NOT NULL ,
	`updated_at` timestamp NOT NULL  ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
