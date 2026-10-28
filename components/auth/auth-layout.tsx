"use client"

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";

function AuthLayout() {
    const [activeTab , setActiveTab] = useState('login')



  return (

   
    
  
   <>


    <div className="flex  items-center justify-center min-h-[80vh] ">

      <div className="w-full max-w-md p-5 bg-card rounded-lg shadow-sm border">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome!</h1>
        {/* tabs-Ye current selected tab ko manage karta hai. Tumhare case mein activeTab ki value use hoti hai */}
        {/* onValueChange- jb tab change ho call setActive (prebuilt)*/}
        <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
            <TabsList className="grid grid-cols-2 mb-4 w-full">
                <TabsTrigger value='login'> Login

                </TabsTrigger>

                <TabsTrigger value='register'> Register

                </TabsTrigger>
            </TabsList>

              <TabsContent value='login'>
                <LoginForm />
              </TabsContent>

              <TabsContent value='register'>
                <RegisterForm  onSuccess={()=>setActiveTab('login')}/>
              </TabsContent>

        </Tabs>
      </div>

  
 

      

    </div>

     <div className="flex min-h-[80vh] flex-col items-center justify-center gap-10 py-12">
   

    <section className="max-w-2xl space-y-4 text-center">
      <h2 className="text-2xl font-bold">Welcome to our blog</h2>
      <p>Discover ideas and stories from our community.</p>
      <p>Sign in to continue or create an account to share your posts.</p>
    </section>
   
  </div>



 </>


    
  );
}

export default AuthLayout;


// Browser cookie → Extract session token →
//  Find matching session in PostgreSQL → Validate session → Identify user.