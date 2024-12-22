import knex from 'knex'

const config = {
    client: 'pg',
    connection: {
        database: 'postgres',
        user: 'postgres',
        password: 'postgres'
    },
    pool: {
        min: 2,
        max: 10
    }
}

export const db = knex(config)