-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  blood_group TEXT,
  allergies TEXT[],
  medical_conditions TEXT[],
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  emergency_contact_relation TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create accidents table
CREATE TABLE public.accidents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  location TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  severity TEXT CHECK (severity IN ('Critical', 'Moderate', 'Low')),
  description TEXT,
  photo_url TEXT,
  status TEXT DEFAULT 'reported' CHECK (status IN ('reported', 'verified', 'dispatched', 'in_transit', 'completed')),
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create ambulances table
CREATE TABLE public.ambulances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_number TEXT UNIQUE NOT NULL,
  driver_name TEXT NOT NULL,
  driver_phone TEXT NOT NULL,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'busy', 'maintenance')),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  equipment TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create hospitals table
CREATE TABLE public.hospitals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  phone TEXT NOT NULL,
  icu_beds INTEGER DEFAULT 0,
  emergency_beds INTEGER DEFAULT 0,
  ambulances_available INTEGER DEFAULT 0,
  specialties TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create rescue_timeline table
CREATE TABLE public.rescue_timeline (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  accident_id UUID REFERENCES public.accidents(id) ON DELETE CASCADE,
  stage TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'completed')),
  description TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  accident_id UUID REFERENCES public.accidents(id) ON DELETE CASCADE,
  recipient_type TEXT NOT NULL CHECK (recipient_type IN ('police', 'family', 'hospital', 'user')),
  recipient_name TEXT,
  recipient_contact TEXT,
  message TEXT NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ambulances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rescue_timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for accidents
CREATE POLICY "Users can view all accidents"
  ON public.accidents FOR SELECT
  USING (true);

CREATE POLICY "Users can create accidents"
  ON public.accidents FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own accidents"
  ON public.accidents FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for ambulances (read-only for users)
CREATE POLICY "Users can view all ambulances"
  ON public.ambulances FOR SELECT
  USING (true);

-- RLS Policies for hospitals (read-only for users)
CREATE POLICY "Users can view all hospitals"
  ON public.hospitals FOR SELECT
  USING (true);

-- RLS Policies for rescue_timeline
CREATE POLICY "Users can view rescue timeline"
  ON public.rescue_timeline FOR SELECT
  USING (true);

CREATE POLICY "Users can create timeline entries"
  ON public.rescue_timeline FOR INSERT
  WITH CHECK (true);

-- RLS Policies for notifications
CREATE POLICY "Users can view notifications"
  ON public.notifications FOR SELECT
  USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_accidents_updated_at
  BEFORE UPDATE ON public.accidents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ambulances_updated_at
  BEFORE UPDATE ON public.ambulances
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_hospitals_updated_at
  BEFORE UPDATE ON public.hospitals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'phone', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Insert seed data for ambulances
INSERT INTO public.ambulances (vehicle_number, driver_name, driver_phone, status, latitude, longitude, equipment) VALUES
('AP-37-ER-1234', 'Ramesh Kumar', '+91-9876543210', 'available', 13.625000, 79.410000, ARRAY['Oxygen', 'Defibrillator', 'First Aid Kit', 'Stretcher']),
('AP-37-ER-5678', 'Priya Sharma', '+91-9876543211', 'available', 13.630000, 79.420000, ARRAY['Oxygen', 'ECG Machine', 'First Aid Kit', 'Stretcher']),
('AP-37-ER-9012', 'Suresh Reddy', '+91-9876543212', 'busy', 13.635000, 79.415000, ARRAY['Oxygen', 'Ventilator', 'First Aid Kit', 'Stretcher']);

-- Insert seed data for hospitals
INSERT INTO public.hospitals (name, address, latitude, longitude, phone, icu_beds, emergency_beds, ambulances_available, specialties) VALUES
('Apollo Hospital', 'Apollo Health City, Tirupati', 13.615000, 79.408000, '+91-877-2234567', 5, 12, 3, ARRAY['Cardiology', 'Neurology', 'Trauma Care', 'ICU']),
('SVIMS Hospital', 'SV Medical College, Tirupati', 13.640000, 79.425000, '+91-877-2287777', 3, 8, 2, ARRAY['Emergency Care', 'General Medicine', 'ICU']),
('Government General Hospital', 'Tiruchanur Road, Tirupati', 13.650000, 79.430000, '+91-877-2248888', 8, 15, 4, ARRAY['Trauma Care', 'General Surgery', 'Emergency Care']);

-- Enable realtime for critical tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.accidents;
ALTER PUBLICATION supabase_realtime ADD TABLE public.ambulances;
ALTER PUBLICATION supabase_realtime ADD TABLE public.rescue_timeline;