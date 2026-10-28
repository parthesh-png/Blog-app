import Container from "@/components/layout/container";
import PostForm from "@/components/post/post-form";
import { auth } from "@/lib/auth";
import { getPostBySlug } from "@/lib/db/queries";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

async function EditPostPage({ params }: { params: Promise<{ slug: string }> }) {
  //Better Auth validates the session using its configured session handling.
  const { slug } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/");
  }

  const post = await getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  // if someone isnt the owner of the page
  if (post.authorId !== session.user.id) {
    redirect("/");
  }

  return (
    <Container>
      <h1 className="max-w-2xl font-bold  text-4xl  mb-6"> EditPost   </h1>
      <PostForm
      isEditing={true}
      post={{
        id:post.id,
        title:post.title,
        description:post.description,
        content:post.content,
        slug :post.slug




      }}
     / >
        
        
    
    </Container>
  );
}

export default EditPostPage;
