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

    return db;
}