DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'admin') THEN
        CREATE ROLE admin WITH
        LOGIN
        SUPERUSER
        CREATEDB
        CREATEROLE
        INHERIT
        REPLICATION
        BYPASSRLS
        CONNECTION LIMIT -1
        PASSWORD 'admin';
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'pern-open-library') THEN
        CREATE DATABASE 'pern-open-library'
            WITH
            OWNER = admin
            TEMPLATE = template0
            ENCODING = 'UTF8'
            ICU_LOCALE = 'en-GB'
            LOCALE_PROVIDER = 'icu'
            CONNECTION LIMIT = -1
            IS_TEMPLATE = False;
    END IF;
END $$;