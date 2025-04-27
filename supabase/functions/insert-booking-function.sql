
-- This SQL file should be run in Supabase SQL Editor to create a stored procedure
-- that will handle bookings insertion without requiring direct table access in TypeScript

CREATE OR REPLACE FUNCTION public.insert_booking(
  p_id TEXT,
  p_user_id UUID,
  p_bike_id TEXT,
  p_bike_name TEXT,
  p_start_date DATE,
  p_end_date DATE,
  p_start_time TEXT,
  p_end_time TEXT,
  p_pickup_location TEXT,
  p_drop_location TEXT,
  p_total_amount NUMERIC,
  p_status TEXT
) RETURNS VOID AS $$
BEGIN
  INSERT INTO public.bookings (
    id,
    user_id,
    bike_id,
    bike_name,
    start_date,
    end_date,
    start_time,
    end_time,
    pickup_location,
    drop_location,
    total_amount,
    status
  ) VALUES (
    p_id,
    p_user_id,
    p_bike_id,
    p_bike_name,
    p_start_date,
    p_end_date,
    p_start_time,
    p_end_time,
    p_pickup_location,
    p_drop_location,
    p_total_amount,
    p_status
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execution privileges to the function
GRANT EXECUTE ON FUNCTION public.insert_booking TO authenticated;
GRANT EXECUTE ON FUNCTION public.insert_booking TO anon;
