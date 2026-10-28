import { auth } from "@/lib/auth";   //instance of auth
import { toNextJsHandler } from "better-auth/next-js";  //connect http call to auth

export const { GET, POST } = toNextJsHandler(auth);   //taking 