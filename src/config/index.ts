import dotenv from "dotenv"

dotenv.config({ debug: true })

type SubConfig = {
  username: string
  password: string
  database: string
  host: string
  dialect: string
  use_env_variable: string
}

type Config = {
  development: SubConfig
  production: SubConfig
  test: {
    dialect: string
    storage: string
  }
  [key: string]: any
}

const config: Config = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: "postgres",
    use_env_variable: "DATABASE_URL"
  },
  test: {
    dialect: "sqlite",
    storage: ":memory:"
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: "postgres",
    use_env_variable: "DATABASE_URL"
  }
}

console.log("DB_USERNAME", process.env.DB_USERNAME)

export default config