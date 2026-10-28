'use client'

import { DeletePostButtonProps } from "@/lib/types";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { deletePost } from "@/actions/post-actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";



 function DeletePostButton({postId} : DeletePostButtonProps){
      const [isDeleting , setIsDeleting] = useState(false)
      const router = useRouter()



    const  handleDelete = async()=>{
             setIsDeleting(true)


        try{
            const res = await deletePost(postId)
            if(res.success){
                toast(res.success)
                router.push('/')
                router.refresh()



            } else{
                 toast(res.message)
            }


        }catch(e){
              toast('an error occured while deleting the post !! please try again ')


        }finally{
            setIsDeleting(false)
        }

    }


    return (
        <>

        <Button 
        disabled={isDeleting} 
        onClick={handleDelete} variant='destructive'  size='sm' >
            <Trash2 className="h-4 w-4 mr-2"/>
            Delete


        </Button>
        </>
    )
    
 }

 export default DeletePostButton;