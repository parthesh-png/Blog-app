
'use client'

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {z} from "zod";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";

// zodResolver
// resolver connection point b?w react hook form and validation
//zodResolver:- connects those Zod rules to React Hook Form.

const RegisterSchema=z.object({
    name :z.string().min(3,'Name must be atleast 3 character long'),
    email: z.string().email('please enter valid email address'),
    password:z.string().min(6,'password must be 6 character long'),
    confirmPassword:z.string().min(6,'password must be 6 character long')

}).refine(data=>data.password === data.confirmPassword,{
    message:'password do not match',
    path: ['confirmPassword']  //Which field should receive this error? 
})

type RegisterFormvalues =z.infer<typeof RegisterSchema>



interface RegisterFormProps {
  onSuccess?:()=> void;   //optional
} 





function RegisterForm({onSuccess}:RegisterFormProps){
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<RegisterFormvalues>({
       resolver: zodResolver(RegisterSchema),
        defaultValues:{
            name:'',
            email:'',
            password:'',
            confirmPassword:''
        }
    })

    const onRegisterSubmit = async(values:RegisterFormvalues)=>{
      setIsLoading(true)
      try{
         const {error} = await signUp.email({
          name:values.name,
          email:values.email,
          password:values.password
         })

         if(error){
          toast('Failed to create account . please try again')
          return
         }
        
         toast('your account has been created successfully , please sign in with email & passowrd ');

         if(onSuccess){
          onSuccess()
         }

      }
      catch(e){
        console.log(e)
        


      }
      finally{
        setIsLoading(false)
      }


    }








    return( 
       <form  onSubmit={form.handleSubmit(onRegisterSubmit)} className="space-y-4">
        <Controller
        control={form.control}
        name="name"
        render={({field , fieldState})=>(

              <Field >
            <FieldLabel htmlFor="name">Name</FieldLabel>

            <Input
              {...field}
              id={field.name}
              type='name'
              placeholder="Enter your name"
             
            />

            <FieldError errors={[fieldState.error]} />


            
          </Field>
            

        )}

        
        
        
        />




         <Controller
        control={form.control}
        name="email"
        render={({field, fieldState})=>(

              <Field >
            <FieldLabel htmlFor="email">Email</FieldLabel>

            <Input
              {...field}
               id={field.name}
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
        render={({field ,fieldState})=>(

              <Field >
            <FieldLabel htmlFor="password">Password</FieldLabel>

            <Input
              {...field}
              id={field.name}
              type='password'
              placeholder="password"
             
            />
          <FieldError errors={[fieldState.error]} />

            
          </Field>
            

        )}

        
        
        
        />

         <Controller
        control={form.control}
        name="confirmPassword"
        render={({field , fieldState})=>(

              <Field >
            <FieldLabel htmlFor={field.name}>Confirm password</FieldLabel>

            <Input
              {...field}
              id={field.name}
              type='passwprd'
              placeholder="Enter your passowrd again"
             
            />
            

               {/* {fieldState.error && (
        <p className="text-sm text-red-500">
          {fieldState.error.message}
        </p>
      )} */}

          <FieldError errors={[fieldState.error]} />

            
          </Field>
            

        )}

        
        
        
        />


        <Button  type='submit' className='w-full'  disabled={isLoading}>

            {
                isLoading ? 'Creating Account' : 'Create Account'
            }


        </Button>

            



       </form>
        
    )


}

export  default RegisterForm;