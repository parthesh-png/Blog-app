import {drizzle} from 'drizzle-orm/node-postgres'
//It creates a Drizzle database instance that you can use to query your PostgreSQL database.

import { Pool } from "pg"  //The pg package is the PostgreSQL driver for Node.js.

import * as schema from './schema'


//SSL/TLS but disables verification of the server certificate's trustworthiness
const pool = new Pool ({
    connectionString : process.env.DATABASE_URL,
    ssl : process.env.NODE_ENV ==='production' ?
    {
        rejectUnauthorized :false
    } : false,
    max :10 

})


//It sets up Drizzle ORM to work with your database using the connection pool and your schema.

export const db = drizzle(pool,{schema});


//this function is created to get one database connection from the pool and give it to whoever calls the function.

export async function getClient(){

    const client = await pool.connect()
    return client
}