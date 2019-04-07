import dotenv from "dotenv"

dotenv.config()

type Config = {
  username: string
  password: string
  database: string
  host: string
  dialect: string
  logging?: boolean
}
type ConfigTest = {
  dialect: string
  storage: string
}

export const development: Config  = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOSTNAME,
  dialect: "postgres",
}

export const production: Config  = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOSTNAME,
  logging: false,
  dialect: "postgres",
}

export const test: ConfigTest  = {
  dialect: "sqlite",
  storage: ":memory:"
}
