import { authOpions } from "@/app/lib/AuthOptions"
import NextAuth from "next-auth"

const handler =NextAuth(authOpions) 


export {handler as GET,handler as POST}