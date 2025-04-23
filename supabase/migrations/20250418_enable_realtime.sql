
-- Enable replication for the waste_listings table
ALTER TABLE public.waste_listings REPLICA IDENTITY FULL;

-- Add the table to the publication used for real-time
ALTER PUBLICATION supabase_realtime ADD TABLE public.waste_listings;
