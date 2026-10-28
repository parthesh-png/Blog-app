


// define protected routes -> /profile,post / create ,/post/edit 
// NextRequest: incoming request ki information access karne ke liye.
//NextResponse: request continue karne ya redirect karne ke liye.
import { NextRequest, NextResponse } from "next/server";

import { getSessionCookie } from 'better-auth/cookies'


// login reqired in which path 
const protectedRoutes =['/profile','/post/create','/post/edit']

export async function middleware(request: NextRequest){
    const pathName = request.nextUrl.pathname //sirf path nikalta hai, domain aur query parameters nahi.
    
     const session = getSessionCookie(request)  //getSessionCookie: Better Auth ki session cookie read karne ke liye.


       //some means it satisfy atleast one element
     const isProtectedRoute = protectedRoutes.some((route)=>
         pathName.startsWith(route)
    )

     if(isProtectedRoute && !session){
        // redirect to auth page as not logged in

        //   request.url current origin deta hai, isliye new URL() usi application ke origin par /auth URL banata hai.
        return NextResponse.redirect(new URL('/auth',request.url ))
     }


    //  if user already logged in , user cant see auth route 
    // w=they will automaticallhy redirect to hoimepage 

    if(pathName === "/auth" && session){
        return NextResponse.redirect(new URL("/",request.url))

    }
 
 return NextResponse.next()

}


// *****     this tell where will be middleware routes run  **********         \\

//Ye /profile aur uske andar ke paths ko match karta hai. * use
export const config ={
    matcher :['/profile/:path*','/post/create','/post/edit/:path*', '/auth']
}