
-- Create the waste_images bucket if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM storage.buckets WHERE name = 'waste_images'
    ) THEN
        INSERT INTO storage.buckets (id, name, public)
        VALUES ('waste_images', 'waste_images', true);
    END IF;
END
$$;

-- Add a policy to allow authenticated users to upload images
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM storage.policies 
        WHERE name = 'Allow authenticated users to upload images' 
        AND bucket_id = 'waste_images'
    ) THEN
        INSERT INTO storage.policies (name, bucket_id, definition, role)
        VALUES (
            'Allow authenticated users to upload images',
            'waste_images',
            '(bucket_id = ''waste_images''::text AND auth.role() = ''authenticated''::text)',
            'authenticated'
        );
    END IF;
END
$$;

-- Add a policy to allow public access to images
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM storage.policies 
        WHERE name = 'Allow public access to images' 
        AND bucket_id = 'waste_images'
    ) THEN
        INSERT INTO storage.policies (name, bucket_id, definition, role)
        VALUES (
            'Allow public access to images',
            'waste_images',
            '(bucket_id = ''waste_images''::text)',
            'anon'
        );
    END IF;
END
$$;
