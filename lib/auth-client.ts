import { createAuthClient }  from 'better-auth/react'



// createAuthClient() creates a client that communicates with your Better Auth server.
export const authClient = createAuthClient({
    // the auth client needs to know which server to send the login request to.
    baseURL : process.env.BASE_URL || "http://localhost:3000"


})




export const {signUp , signIn, signOut ,useSession }  = authClient

