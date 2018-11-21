## install


#### sql

    CREATE TABLE subscribers (
        email TEXT PRIMARY KEY,
        subscribed BOOLEAN DEFAULT 'true',
        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp
    );
