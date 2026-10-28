
import {   relations } from 'drizzle-orm';
import {pgTable, 
    varchar,
    boolean, 
    timestamp, 
    text, 
    serial} from 'drizzle-orm/pg-core'



// right side actual database table name
export const users = pgTable('users',{
    id: varchar('id',{length :255}).primaryKey(),  //varchar(...) → id column mein text store hoga.
    name:varchar('name',{length:255}).notNull(),
    email:varchar('email' ,{length:255}).notNull().unique(),
    emailVerified: boolean('email_verified').default(false),
    image: text('image'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  



});

// for session 

export const sessions =pgTable('sessions' ,{
    id: varchar('id',{length :255}).primaryKey(),
    userId : varchar('user_id', { length : 255}).references(()=>users.id).notNull(),  //user_id ko users table ke id se connect karo

    token: varchar('token',{length:255}),

    expiresAt: timestamp('expires_at').notNull(),
    ipAddress:  varchar('ip_address',{length:255}),  //ipAddress → request kis IP address se aayi
    userAgent: text('user_agent'),  //userAgent batata hai ki user kis browser ya device se website access kar raha hai. 
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
    





})


export  const accounts = pgTable('accounts',{
     id: varchar('id',{length :255}).primaryKey(),
      userId : varchar('user_id', { length : 255})
      .references(()=>users.id).notNull(),
      accountId : varchar('account_id',{length:255}).notNull(),
      providerId: varchar('provider_id',{length:255}).notNull() ,
    accessToken: text('access_token'),   //Google ki permitted APIs ko access karne ke liye token.
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),                             //Google login flow mein ye batane mein help karta hai ki authenticated user kaun hai.
    accessTokenExpiresAt: timestamp('access_token_expires_at'), //Access token kis date aur time par expire hoga
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
    scope: text('scope'),       //Batata hai ki external provider se kaunsi permissions maangi gayi hain.
      password:  text('password') ,
       createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()


   

});

export const verifications = pgTable('verification', {
    id: varchar('id', { length: 255 }).primaryKey(),
    identifier: varchar('identifier', { length: 255 }).notNull(),
    value: text('value').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});


export const posts = pgTable('posts',{
    id : serial('id').primaryKey(),
    title:varchar('title',{length:255}).notNull(),
    description:varchar('description',{length:255}).notNull(),
    slug:varchar('slug',{length:255}).notNull().unique(),  //slug us post ko URL se identify karne wala naam hai.
    content:text('content').notNull(),
    authorId : varchar('author_id',{length:255})
    .references(()=>users.id)
    .notNull(),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
 

   
})

//One user → many posts

// one to many 
// user realtion , - user can auther many post , can have multiple acount ,can have multople session

export const usersRelations = relations(posts, ({one})=>({
    author: one(users , {
        fields :[posts.authorId],
        references: [users.id]
    })
  


}))
    

// 
// Each post → one user

// post realtions 
// one author (user) per post 

export const postsRelations =  relations(posts ,({one})=>({
    author : one(users, {
        fields :[posts.authorId],
        references : [users.id]
    })

}))

   //Each account → one user
//each account belong to one user

export const accountsRelations = relations( accounts, ({one})=>({
    user: one(users,{
        fields:[accounts.userId],
        references:[users.id]

    })

}) )


// Each session → one user

export const sessionRelations = relations(sessions,({one})=>({
    user:  one(users,{
        fields:[sessions.userId],
        references:[users.id]
    })

}))


// you want to import the entire collection:

export const schema={
    users,
    accounts,
    sessions,
    verifications,
    posts,

}