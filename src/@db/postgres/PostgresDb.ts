import { Pool, PoolConfig } from "pg";

export class PostgresDb {
  private static pool?: Pool;

  static getPool() {
    if (PostgresDb.pool) {
      return PostgresDb.pool;
    }

    const poolConfig: PoolConfig = {};

    if (process.env.DATABASE_URL) {
      // HEROKU production

      Object.assign(poolConfig, {
        connectionString: process.env.DATABASE_URL,
        ssl: true,
      });
    } else {
      // Local dev

      Object.assign(poolConfig, {
        host: process.env.NLP20_POSTGRESQL_1_HOST,
        port: parseInt(process.env.NLP20_POSTGRESQL_1_PORT, 10),
        user: process.env.NLP20_POSTGRESQL_1_USER,
        password: process.env.NLP20_POSTGRESQL_1_PSW,
        database: process.env.NLP20_POSTGRESQL_1_DB,
        ssl: {
          rejectUnauthorized: false,
        },
      });
    }

    return (PostgresDb.pool = new Pool(poolConfig));
  }
}
