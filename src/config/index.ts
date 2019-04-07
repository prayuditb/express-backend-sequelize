import dotenv from "dotenv"

dotenv.config()

type Config = {
  username: string
  password: string
  database: string
  host: string
  dialect: string
  use_env_variable: string
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
  use_env_variable: "DATABASE_URL"
}

export const production: Config  = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOSTNAME,
  dialect: "postgres",
  use_env_variable: "DATABASE_URL"
}

export const test: ConfigTest  = {
  dialect: "sqlite",
  storage: ":memory:"
}
