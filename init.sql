-- Create the database
CREATE DATABASE cms_webapp_dev;

-- Create the user and grant necessary privileges
CREATE USER myuser WITH PASSWORD 'mypassword';
GRANT CONNECT ON DATABASE cms_webapp_dev TO myuser;
GRANT USAGE ON SCHEMA public TO myuser;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO myuser;