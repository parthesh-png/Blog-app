# ✍️ Blog Platform

A full-stack blog application built with **Next.js 15, TypeScript, PostgreSQL, Drizzle ORM, and Better Auth**. The application allows users to authenticate securely and create, read, update, and delete blog posts.

The project focuses on modern Next.js development, server-side operations, database management, authentication, and protected routes.

## 🚀 Features

- **User Authentication:** Secure user authentication using Better Auth.
- **Create Blog Posts:** Write and publish blog posts.
- **Read Blog Posts:** Browse published posts and view individual posts.
- **Update Blog Posts:** Edit existing posts.
- **Delete Blog Posts:** Remove posts when necessary.
- **Dynamic Post URLs:** Generate URL-friendly slugs from post titles.
- **Duplicate Slug Validation:** Prevent conflicting post URLs.
- **Protected Routes:** Restrict access to authenticated users.
- **Server-Side Session Validation:** Verify user sessions before performing protected operations.
- **Database Integration:** Store users, sessions, accounts, and posts in PostgreSQL.
- **Database Migrations:** Manage database schema changes using Drizzle ORM.
- **Modern UI:** Build responsive interfaces using React and Tailwind CSS.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 15 | Full-stack React framework |
| React | User interface |
| TypeScript | Static type checking |
| PostgreSQL | Relational database |
| Drizzle ORM | Database queries, schema definitions, and migrations |
| Better Auth | Authentication and session management |
| Tailwind CSS | Styling and responsive layouts |
| Zod | Schema validation, where configured |
| React Hook Form | Form management, where configured |
| Zustand | Client-side state management, where configured |

## 📁 Project Structure

The project follows a modular structure, separating pages, reusable components, database configuration, and application logic.

```text
blog-project/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...all]/
│   ├── auth/
│   ├── post/
│   │   ├── [slug]/
│   │   ├── create/
│   │   └── edit/
│   ├── profile/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ui/
│   └── ...
│
├── drizzle/
│   └── migrations/
│
├── lib/
│   ├── db/
│   │   ├── schema.ts
│   │   └── ...
│   ├── auth.ts
│   └── ...
│
├── middleware.ts
├── drizzle.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

*Note: This is a representative structure. Keep only the folders and files that exist in your actual repository.*

## ⚙️ Getting Started

Follow these steps to run the project locally.

### 1. Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm
- PostgreSQL
- A code editor such as Visual Studio Code

### 2. Clone the Repository

```bash
git clone <https://github.com/parthesh-png/Blog-app>
```

Navigate to the project directory:

```bash
cd <blog-app>
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory.

Add the following environment variables:

```env
DATABASE_URL="your_postgresql_connection_string"

BETTER_AUTH_SECRET="your_secure_random_secret"
BETTER_AUTH_URL="http://localhost:3000"
```

**Environment variable descriptions:**

- `DATABASE_URL`: Connection string used to connect to your PostgreSQL database.
- `BETTER_AUTH_SECRET`: Secret used by Better Auth for cryptographic operations.
- `BETTER_AUTH_URL`: Base URL of your application.

Replace the example values with your actual configuration.

**Important:** Never commit your `.env` file or expose your authentication secret in your repository.

### 5. Configure the Database

Make sure your PostgreSQL database exists and that `DATABASE_URL` points to the correct database.

Generate a migration from your Drizzle schema:

```bash
npx drizzle-kit generate
```

Apply the generated migration:

```bash
npx drizzle-kit migrate
```

These commands assume your project uses Drizzle Kit's standard migration workflow. Follow your existing database configuration if you use a different workflow.

### 6. Start the Development Server

```bash
npm run dev
```

Open the following address in your browser:

```text
http://localhost:3000
```

Your application should now be running locally.

## 🔐 Authentication and Authorization

The application uses **Better Auth** to manage authentication and user sessions.

### Authentication Flow

1. A user registers or logs in.
2. Better Auth validates the authentication request.
3. A session is created and maintained using the configured session mechanism.
4. The browser sends the appropriate session cookie with subsequent requests.
5. Protected operations validate the user's session before proceeding.

### Protected Routes

The application uses middleware to control access to selected routes.

Examples include:

- `/profile`
- `/post/create`
- `/post/edit`

The exact routes depend on the application's current middleware configuration.

When a user without a valid session attempts to access a protected route, the application redirects the user to the authentication page.

Server-side session validation provides an additional security check before protected database operations.

For example:

```typescript
const session = await auth.api.getSession({
  headers: await headers(),
});

if (!session?.user) {
  redirect("/");
}
```

This checks whether a valid authenticated user is available for the current server-side request.

**Security note:** Middleware-based checks should not be the only protection for sensitive operations. Server-side functions and database mutations must independently enforce authentication and any required authorization rules.

## 📝 Blog Post Management

The application supports CRUD operations for blog posts.

CRUD stands for Create, Read, Update, and Delete.

### Create

Users can submit a post containing information such as:

- Title
- Description
- Content

The application can generate a URL-friendly slug from the title.

For example:

```text
Title: Getting Started with Next.js

Slug: getting-started-with-next-js
```

### Read

Users can retrieve posts from the database and access individual posts through their slugs.

Example URL:

```text
/post/getting-started-with-next-js
```

### Update

Users can modify existing posts.

The application can regenerate a slug when a title changes and check whether another post already uses that slug.

### Delete

Users can remove existing posts through the application's server-side database operations.

Protected operations should verify that the current user has permission to modify or delete the requested post.

## 🗄️ Database Design

The application uses PostgreSQL with Drizzle ORM.

The main database tables include the following.

### Users

Stores user information.

Typical fields include:

- `id`
- `name`
- `email`
- `image`

### Sessions

Stores authentication session information managed by Better Auth.

Typical fields include:

- `id`
- `userId`
- `token`
- `expiresAt`

### Accounts

Stores authentication provider account information, depending on the configured authentication methods.

### Posts

Stores blog post information.

Typical fields include:

- `id`
- `title`
- `description`
- `slug`
- `content`
- `authorId`
- `createdAt`
- `updatedAt`

The `authorId` field references the user who created the post.

Drizzle ORM provides a type-safe way to interact with the database and define relationships between tables.

## 🔄 Database Operations

Drizzle ORM supports the database operations used throughout the application.

Examples include:

**Insert a post**

```typescript
await db.insert(posts).values({
  title,
  description,
  slug,
  content,
  authorId,
});
```

**Find a post**

```typescript
const post = await db.query.posts.findFirst({
  where: eq(posts.slug, slug),
});
```

**Update a post**

```typescript
await db
  .update(posts)
  .set({
    title,
    description,
    slug,
    content,
  })
  .where(eq(posts.id, postId));
```

**Delete a post**

```typescript
await db
  .delete(posts)
  .where(eq(posts.id, postId));
```

These snippets illustrate the general query patterns. The exact implementation depends on your schema, imports, validation, and server-side authorization.

## 🧭 Dynamic Routing and Slugs

The application uses dynamic routes to display individual blog posts.

For example:

```text
/post/[slug]
```

Here, `[slug]` is a dynamic route segment that represents the post's URL-friendly identifier.

A slug utility can convert a title into a URL-friendly format:

```typescript
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
```

For example:

```text
Input:  My First Blog Post!
Output: my-first-blog-post
```

Before saving or updating a post, the application should check for conflicting slugs. A database-level unique constraint on the slug is also recommended to prevent duplicates under concurrent requests.

## ♻️ Cache Revalidation

When a post is created or updated, cached pages may need to be refreshed so that users see the latest content.

Next.js provides `revalidatePath()` for this purpose.

Example:

```typescript
import { revalidatePath } from "next/cache";

revalidatePath("/");
```

This invalidates the relevant cached route so that its content can be regenerated when needed.

For individual posts, the application can also revalidate the corresponding post route after an update or deletion.

The paths that need revalidation depend on which pages display the affected content.

## 🧪 Running the Project

Start the development server:

```bash
npm run dev
```

Run the production build:

```bash
npm run build
```

Start the production server after building:

```bash
npm run start
```

Run linting if the corresponding script is configured:

```bash
npm run lint
```

Check `package.json` for the scripts supported by your current Next.js version and project configuration.

## 🌐 Deployment

The application can be deployed to a hosting platform that supports Next.js, with a compatible hosted PostgreSQL database.

Before deployment:

1. Configure the production PostgreSQL database.
2. Set the required environment variables in the hosting platform.
3. Apply database migrations.
4. Configure the production authentication URL and trusted origins as required by Better Auth.
5. Verify that protected routes and server-side operations work correctly.
6. Build and deploy the application.

Never expose database credentials or authentication secrets in client-side code.

## 🎯 Learning Objectives

This project demonstrates practical experience with:

- Building full-stack applications using Next.js.
- Managing authentication and user sessions.
- Creating protected routes and validating sessions on the server.
- Integrating PostgreSQL with Drizzle ORM.
- Performing CRUD operations.
- Designing relational database schemas.
- Working with dynamic routes and URL slugs.
- Managing cached pages and revalidation.
- Using TypeScript to improve code safety and maintainability.

## 🔮 Future Improvements

Potential improvements include:

- Rich-text or Markdown editing.
- Post search and filtering.
- Pagination for large collections of posts.
- Categories and tags.
- Comments and reactions.
- Image uploads.
- Role-based access control.
- Automated tests for authentication and post management.
- Improved SEO metadata and Open Graph previews.

## 👨‍💻 Author

Parthesh Singh




---

⭐ If you find this project useful, consider giving the repository a star!
