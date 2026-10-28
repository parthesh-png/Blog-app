"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";  //this connect react hook with zod validation
import { Controller, useForm } from "react-hook-form";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


// schema const login schema =

const loginSchema = z.object({
  email: z.string().email("please enter the email address"),
  password: z.string().min(6, "password must be at least 6 characters long"),
});

//it meand loginFormValues has same type as schema , email-string ,password-string
// infer auto figureOut
type LoginFormValues = z.infer<typeof loginSchema>;


function LoginForm() {
  
  //for pusing home page after login
  const router = useRouter()

    const [isLoading , setIsLoading] = useState(false)


  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLoginSubmit = async(values:LoginFormValues)=>{
    setIsLoading(true)
    try{
      const {error} = await signIn.email({
        email:values.email,
        password:values.password,
        rememberMe:true


        })

      if(error){
        toast('Login failed')
        return
      }

      toast('login Success')
      router.push('/')
      //console.log(values)

    }catch(e){
      console.log(e)

    }finally{
      setIsLoading(false)
    }

  }




  return (
    <form   onSubmit={form.handleSubmit(onLoginSubmit)} className="space-y-2">
      <Controller
        control={form.control}
        name="email"
        render={({ field , fieldState}) => (
          <Field >
            <FieldLabel htmlFor="Email">Email</FieldLabel>

            <Input
              {...field}
              id="email"
              type='email'
              placeholder="Enter your email"
             
            />
            <FieldError errors={[fieldState.error]} />

            
          </Field>
        )}
      />


           <Controller
        control={form.control}
        name="password"
      
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="password">password</FieldLabel>

            <Input
              {...field}
              id='password'
             
              type ='password'
              placeholder="password"
               aria-invalid={fieldState.invalid}
            />
         
         <FieldError errors={[fieldState.error]} />
            
          </Field>
        )}
      />

       <Button  type='submit' className='w-full'  disabled={isLoading}>

            {
                isLoading ? 'Signing in...' : 'Sign in'
            }


        </Button>

    </form>
  );
}

export default LoginForm;


















// *** Flow of Login success

// The form validates basic input. In components/auth/login-form.tsx, loginSchema checks that the email looks valid and the password is at least six characters. This is input validation—it doesn’t check whether the credentials are correct.
// The form calls Better Auth’s client. signIn.email({ email, password, rememberMe: true }) sends the credentials to the auth server.
// The auth route receives the request. app/api/auth/[...all]/route.ts uses toNextJsHandler(auth) to route Better Auth requests.
// Better Auth checks the credentials. Your lib/auth.ts enables emailAndPassword and configures the Drizzle database adapter. Better Auth looks up the user by email, retrieves the associated credential account, and verifies the submitted password against the stored password hash. It’s a hash comparison—not a comparison against a plaintext password.
// The form handles the result. In onLoginSubmit, an error triggers “Login failed”; otherwise, it shows success and navigates to /.
// After successful verification, Better Auth creates the session. The session settings and database mapping in lib/auth.ts support this. The browser receives the session cookie, which identifies the signed-in user on later requests.