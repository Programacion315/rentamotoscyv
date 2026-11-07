import { DatabaseSync } from "node:sqlite"
import { mkdirSync } from "node:fs"
import { dirname, join } from "node:path"

// Self-contained SQLite file — no external credentials, no migration step.
// Lives outside git (see .gitignore) and persists across deploys/restarts
// since pm2 restarts and `git pull` never touch it.
const DB_PATH = join(process.cwd(), "data", "analytics.sqlite")

let db: DatabaseSync | null = null

function getDb(): DatabaseSync {
  if (db) return db
  mkdirSync(dirname(DB_PATH), { recursive: true })
  db = new DatabaseSync(DB_PATH)
  db.exec(`
    CREATE TABLE IF NOT EXISTS visits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      path TEXT,
      ip TEXT,
      country TEXT,
      country_code TEXT,
      city TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `)
  return db
}

export function recordVisit(input: {
  path: string
  ip: string | null
  country: string | null
  countryCode: string | null
  city: string | null
}) {
  const database = getDb()
  database
    .prepare(
      `INSERT INTO visits (path, ip, country, country_code, city) VALUES (?, ?, ?, ?, ?)`
    )
    .run(input.path, input.ip, input.country, input.countryCode, input.city)
}

export type CountryStat = { country: string; countryCode: string | null; count: number }

export function getVisitStats(): { total: number; byCountry: CountryStat[] } {
  const database = getDb()
  const totalRow = database.prepare(`SELECT COUNT(*) as c FROM visits`).get() as
    | { c: number }
    | undefined
  const byCountry = database
    .prepare(
      `SELECT COALESCE(country, 'Desconocido') as country, country_code as countryCode, COUNT(*) as count
       FROM visits
       GROUP BY country, countryCode
       ORDER BY count DESC
       LIMIT 10`
    )
    .all() as unknown as CountryStat[]
  return { total: totalRow?.c ?? 0, byCountry }
}
