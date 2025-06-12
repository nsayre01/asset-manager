-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Locations Lookup (ex: 'LIBR 123')
CREATE TABLE IF NOT EXISTS location (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    building_code text NOT NULL,
	building_name text NOT NULL,
	room_number text NOT NULL
);

-- Departments Lookup (ex: 'Athletics')
CREATE TABLE IF NOT EXISTS department (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE
); 

-- Models Lookup (ex: Dell OptiPlex 7080)
CREATE TABLE IF NOT EXISTS model (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    brand TEXT,
    name TEXT NOT NULL UNIQUE,
    small_form BOOLEAN,
	type TEXT NOT NULL CHECK (
        type IN ('Laptop', 'Monitor', 'Printer', 'Desktop', 'Tablet', 'iTech', 'Scanner', 'Software')
    )
);

-- Client (who assets can be assigned to)
CREATE TABLE IF NOT EXISTS client (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    dept_id UUID REFERENCES department(id),
    active BOOLEAN NOT NULL DEFAULT TRUE
);

-- technician - people updating the data
CREATE TABLE IF NOT EXISTS technician (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE
);

-- Static asset info (immutable)
CREATE TABLE IF NOT EXISTS asset_info (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE, 	
    serial_number TEXT NOT NULL UNIQUE,
    purchase_date DATE NOT NULL,
    warranty_expiration DATE,
    model_id UUID NOT NULL REFERENCES model(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by UUID NOT NULL REFERENCES technician(id)
);

-- Asset change log (mutable / historical)
CREATE TABLE IF NOT EXISTS asset_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID NOT NULL REFERENCES asset_info(id) ON DELETE CASCADE,
    status TEXT CHECK (
        status in ('Assigned', 'In Stock', 'Scrapped', 'In Repair', 'Lost/Stolen')
    ),
    location_id UUID REFERENCES location(id),
    assigned_to UUID REFERENCES client(id),
    dept_id UUID REFERENCES department(id),
    docking_station BOOLEAN,
    is_primary BOOLEAN,
    redeploy BOOLEAN,
    notes TEXT,
    last_audit DATE,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by UUID NOT NULL REFERENCES technician(id)

);