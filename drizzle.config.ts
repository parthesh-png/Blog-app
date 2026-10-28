
import {Config} from 'drizzle-kit'

export default{
    schema:'./lib/db/schema.ts',  //db location
    out: './drizzle',  //where to sav migraton fle
    dialect:'postgresql',  //type of db
    dbCredentials:{
        url:process.env.DATABASE_URL || ''
    } ,
    verbose:true,   //more details output
    strict:true       //catch migration issue
}   satisfies Config     //mathces with expected config 