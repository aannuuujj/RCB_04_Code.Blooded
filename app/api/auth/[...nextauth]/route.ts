import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;
      
      try {
        const { data: existingUser } = await supabaseAdmin
          .from("profiles")
          .select("id")
          .eq("email", user.email)
          .single();

        if (!existingUser) {
          // Note: If profiles.id references auth.users in Supabase, this insert may fail 
          // unless the user was also created in auth.users. 
          await supabaseAdmin.from("profiles").insert({
            id: crypto.randomUUID(), // Generates UUID
            email: user.email,
            name: user.name || "",
          });
        }
        return true;
      } catch (error) {
        console.error("Error syncing user to Supabase profiles:", error);
        return true; // Return true to allow login even if sync fails
      }
    },
    async session({ session, token }) {
      // Expose user id if needed
      return session;
    }
  },
});

export { handler as GET, handler as POST };
