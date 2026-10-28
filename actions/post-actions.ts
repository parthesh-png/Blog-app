
'use server'

import { auth } from "@/lib/auth"  //auth.api.getSession give current user
import { db } from "@/lib/db"
import { posts } from "@/lib/db/schema"
import { slugify } from "@/lib/utils"
import { and, eq, ne } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"



//FormData () is javascript api that collect data from form 
export async function createPost(formData:FormData){

    try{


        // get current user
        const session = await auth.api.getSession({
            headers :await headers()

        })

        if(!session || !session?.user)
            return{
                  success:false,
                  message:'you need to log in before creaing the post'
        }

        // get form data of creating post

        const title = formData.get('title') as string;
         const description = formData.get('description') as string;
          const content = formData.get('content') as string;

        //   create the slug from post title 

        const slug = slugify(title)
        // check the title exist earlier 
        const existingPost = await db.query.posts.findFirst({
            //slug is equal to slug value
            where:eq(posts.slug,slug)  //eq(posts.slug, slug) — means the database column posts.slug must equal the value stored in your slug variable.
        })

        if(existingPost){
            return {
            success: false,
            message:
              "A post with same title already exists ! please try with another name  "
            }
        }


             //data we are giving
             //Drizzle ORM mein .returning() inserted rows ko array mein return karta
        const [newPost] = await db.insert(posts).values({
              title, 
              description,
              content,
              slug,
              authorId:session.user.id
        }) .returning()

        // revalidate the home page to get latest, it update cached output after post crearte
        revalidatePath('/')
        revalidatePath(`/post/${slug}`) //this work in edit ,update the cached of specific output
        revalidatePath('/profile')  //this update the profile where all blog listed 
         


        return {
            success:true,
            message:'Bingooo! Post successfully Created...',
            slug
        }



    }catch(e){
        console.log(e,'failed to add')
        
        return {
            success:true,
            message:'Opss!  Failed to create  new Post...',
            
        }

    }
}


export async function updatePost(postId:number,formData :FormData){

    try{

        const session = await auth.api.getSession({
            headers:await headers()
        })


        if(!session || !session.user){
            return {
                success:false,
                message:'you must logged in to edit a post !!'
            }
        }

        // get from data

        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const content = formData.get("content") as string;


      //it check slug already taken not 
     const slug = slugify(title) //it slug the data we enter  in update
     const existingPost =  await db.query.posts.findFirst({
        where : and(eq(posts.slug,slug),
        ne(posts.id,postId))   //it check weather the new title matches with any other ppl slug with id 
     })

     if(existingPost){
        return{
            success:false,
            message:"A post with this title already exist"
        }
     }
           const post = await db.query.posts.findFirst({
            where : eq(posts.id,postId)

           })

           if(post?.authorId !== session.user.id){
                     return{
                         success:false,
                         message:'you can only edit your own post'
        
 }
           }

           await db.update(posts).set({
            title,description,content,slug,updatedAt:new Date()

           }).where(eq(posts.id,postId))

           revalidatePath('/')
           revalidatePath(`/post/${slug}`)
           revalidatePath('/profile')



           return{
            success:true,
            message: 'post edited successfully'
           }


  
    }catch(e){
        console.log(e,'failed to edit ')
        return {
            success:false,
            message:"failed to create new post"
        };


    }


}




export async function deletePost(postId : number){


    try{
         const session = await auth.api.getSession({
            headers : await headers()
         })

        
        if(!session || !session?.user)
            return{
                  success:false,
                  message:'you need to log in before delete the post '
        }



     const postToDelete = await db.query.posts.findFirst({
              where :eq(posts.id ,postId)
          })

     if(!postToDelete)
            return{
             success: false,
             message:'post not found '
           }


             if(postToDelete?.authorId !== session.user.id){
                     return{
                         success:false,
                         message:'you can only delete your own post'
        
                         }
         



           }
           
           await  db.delete(posts).where(eq(posts.id,postId))
           revalidatePath('/')
           revalidatePath('/profile')

           return {
            success:true,
            message:"post deleted successfully"
           }
    } 

    

         
    
    catch(e){
        console.log(e,"not able to delete")
        return{
            success:false,
            message:'Can`t delete the Post'
            
        }
        

    }

}