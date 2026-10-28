import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//slugify() is to convert text into a URL-friendly string, called a slug.

export function slugify(text:string):string{
  return text.toLowerCase()
 .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "")
  //convert next js 15 -> next-js-15

}

export function formatDate(date:Date):string{
  //JavaScript ka built-in API hai jo date ko readable format mein convert karta hai.
  // Intl ka full form Internationalization
  return new Intl.DateTimeFormat('en-us',{
    month:'long',
    day:"numeric",
    year:"numeric"
  }).format(date)
}