SET @pos := -1;

UPDATE category_properties
SET order_position = (@pos := @pos + 1)
ORDER BY created_at ASC, id ASC;
