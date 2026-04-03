-- Crown (currently scatter) → rename back, remove scatter, keep crown image as the top paying symbol "Gold Cup"
-- Gold Cup (currently normal) → becomes the scatter with cat image

-- Step 1: Make Crown no longer scatter, rename to Gold Cup, keep red crown image
UPDATE slot_symbols 
SET is_scatter = false, name = 'Gold Cup'
WHERE id = '44ef03e4-acc2-435d-88d1-561cf46c84c5';

-- Step 2: Make old Gold Cup the scatter with cat image
UPDATE slot_symbols 
SET is_scatter = true, 
    name = 'Scatter',
    image_url = 'https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/slot-symbols/gates-scatter-cat.png'
WHERE id = 'ff478430-6669-4208-86c1-a75cda6ce4f0';