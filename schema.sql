-- HRMS SQLite schema

CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role TEXT,
    dept TEXT,
    mobile TEXT,
    date TEXT,
    status TEXT,
    period TEXT,
    endDate TEXT,
    salary TEXT,
    payStatus TEXT,
    leaveType TEXT,
    leaveStart TEXT,
    leaveEnd TEXT,
    leaveStatus TEXT,
    storage INTEGER DEFAULT 0,
    lastModified TEXT,
    avatar TEXT
);

CREATE TABLE IF NOT EXISTS events (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    day INTEGER,
    start REAL,
    end REAL,
    label TEXT,
    color TEXT
);

CREATE TABLE IF NOT EXISTS integrations (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    desc TEXT,
    active INTEGER,
    icon TEXT
);

CREATE TABLE IF NOT EXISTS settings (
    email TEXT,
    country TEXT,
    language TEXT,
    timezone TEXT,
    timeformat TEXT,
    website TEXT,
    bio TEXT,
    theme TEXT,
    profileName TEXT,
    profileTitle TEXT,
    profilePhone TEXT,
    profileEmail TEXT,
    profileAddress TEXT,
    profileBio TEXT,
    profileAvatar TEXT
);
