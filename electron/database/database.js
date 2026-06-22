import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { app } from "electron";

let db = null;

export async function connectDatabase() {
    if (db) return db;

    db = await open({
        filename: path.join(app.getPath("userData"), "electricsearch.db"),
        driver: sqlite3.Database,
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS indexed_folders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            path TEXT UNIQUE NOT NULL,
            added_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS images (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            folder_id INTEGER NOT NULL,
            path TEXT UNIQUE NOT NULL,
            file_name TEXT NOT NULL,
            extension TEXT NOT NULL,
            indexed_at DATETIME DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY(folder_id)
                REFERENCES indexed_folders(id)
                ON DELETE CASCADE
        );
`   );

    return db;
}