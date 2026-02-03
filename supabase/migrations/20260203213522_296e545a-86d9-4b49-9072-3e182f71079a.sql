-- Change multiplier columns from integer to numeric to support decimal values
ALTER TABLE slot_symbols 
  ALTER COLUMN multiplier_3 TYPE numeric(10,2),
  ALTER COLUMN multiplier_4 TYPE numeric(10,2),
  ALTER COLUMN multiplier_5 TYPE numeric(10,2);