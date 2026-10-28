import { betterAuth } from 'better-auth';
import { drizzleAdapter}   from 'better-auth/adapters/drizzle'
import { db } from './db';
import * as schema from './db/schema'


export const auth =  betterAuth({

    appName: 'Next.js 15 blog',
    secret: process.env.BETTER_AUTH_SECRET || 'BETTER_AUTH_SECRET',
    baseURL:process.env.BASE_URL,
    //lets the authentication library use Drizzle to read and write authentication data in PostgreSQL.
    //code actually works when a user signs up or logs in.
    database:drizzleAdapter(db,{
        provider:'pg',
          schema :{
            ...schema,
            user :schema.users,
            session:schema.sessions,
            account:schema.accounts,
            verification:schema.verifications
               

          }
    }),

    emailAndPassword:{
        enabled :true,
        requireEmailVerification:false,  //Users don't have to verify their email before this authentication flow allows them to proceed
        minPasswordLength:6,
         maxPasswordLength:128,
         autoSignIn:false   //After signing up, don't automatically sign the user in.

    },

    //A session lets your application remember that a user has logged in.
    session:
    {
        expiresIn:60 * 60 * 24 *7,  //7 days 60*60=1hrs
        updateAge:60*60*24,  //session refreshing happens every day while you're active, the session can keep extending beyond its original 7-day expiry
        cookieCache :{
            enabled:true,
            maxAge: 60 * 5
        },
        disableSessionRefresh:true,
        
    },

    // When enabled, Better Auth uses secure cookie behavior and HTTPS-compatible cookie settings. 
    advanced :{
        useSecureCookies: process.env.NODE_ENV === 'production',   //In production, the value is true.
        useDefaultCookieAttributes:{
            httpOnly :true,
            secure:process.env.NODE_ENV === 'production'
        }
    }
})