"use client";

import { z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
//useForm() array nahi, ek object return karta hai jisme bahut saari properties aur functions hote hain.
import { useForm } from "react-hook-form"; //manage form in react
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react"; //useTransition helps React prioritize the urgent work.
import { createPost, updatePost } from "@/actions/post-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

//// post from schema for validation
const postSchema = z.object({
  title: z
    .string()
    .min(3, "Title mustbe at least 2character long")
    .max(255, "Title must be less than 255 characters"),

  description: z
    .string()
    .min(5, "Description must be at least 2 characters long")
    .max(255, "Descrption must be less than 255 characters"),
  content: z.string().min(10, "Description must be at least 2 character long"),
});

//for edit the blog page
interface PostFormProps {
  isEditing?: boolean; //all are optional
  post?: {
    id: number;
    title: string;
    description: string;
    content: string;
    slug: string;
  };
}

type PostFormValues = z.infer<typeof postSchema>;
// resolver is the place where you provide the validator;
// zodResolver is the function that connects Zod to that place.

function PostForm({ isEditing, post }: PostFormProps) {
    
  const [isPending, startTranstion] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues:
      isEditing && post
        ? {
            title: post.title,
            description: post.description,
            content: post.content,
          }
        : {
            title: "",
            description: "",
            content: "",
          },
  });

  //FormData() is a built-in JavaScript Web API
  // that collects data from a form and stores it as key-value pairs.

  const onFormSubmit = async (data: PostFormValues) => {
    startTranstion(async () => {
      try {
        const formData = new FormData(); //in post-action the type is formdata
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("content", data.content);

        let res;

        //    for update
        if (isEditing && post) {
          res = await updatePost(post.id, formData);
        } else {
          res = await createPost(formData);
        }

        console.log(res, "res");
        //sending formdata
        //    res = await createPost(formData)
        //    console.log(res,'res')

        if (res.success) {
            toast(isEditing ? 'Post edited successfully ' : 'Post created successfully ')
          toast("Post created successfully! ");
          router.refresh();
          router.push("/");
        } else {
          toast(res.message);
        }
      } catch (e) {
        toast("failed to creare post");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-2">
      <div className="space-y-2">
        <Label htmlFor="title"> Title </Label>
        <Input
          id="title"
          placeholder="Enter post title"
          {...register("title")}
          disabled={isPending} //is pending is true disable this
        />
        {errors?.title && (
          <p className="text-sm text-red-700">{errors.title.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description"> Description </Label>
        {/* <Input id='title' placeholder="Enter post title"/> */}
        <Textarea
          id="description"
          placeholder="Enter a short description"
          {...register("description")}

          disabled={isPending}
        />
        {errors?.description && (
          <p className="text-sm text-red-700">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content"> Description </Label>
        {/* <Input id='title' placeholder="Enter post title"/> */}
        <Textarea
          id="content"
          placeholder="Enter a post content"
          className="min-h-62.5  resize-none" //resize-none - dont allow to streach the form area
          {...register("content")}
          disabled={isPending}
        />

        {errors?.content && (
          <p className="text-sm text-red-700">{errors.content.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isPending} className="mt-5 w-full">
        {isPending
          ? "Saving Post..."
          : isEditing
            ? "Update Post ..."
            : "Create Post"}
      </Button>
    </form>
  );
}

export default PostForm;
