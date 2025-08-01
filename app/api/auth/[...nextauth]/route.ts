// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });
        const data = await res.json();

        if (res.ok && data.success) {
          return {
            id: data.data.id,
            name: data.data.name,
            email: data.data.email,
            accessToken: data.data.accessToken,
            refreshToken: data.data.refreshToken,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }: any) {
      // Initial sign in
      if (account && user) {
        // For Google OAuth
        if (account.provider === "google") {
          // Return Google tokens + user info
          return {
            ...token,
            accessToken: account.access_token,
            refreshToken: account.refresh_token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          };
        }
        
        // For credentials provider
        if (account.provider === "credentials") {
          return {
            ...token,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          };
        }
      }
      return token;
    },
    async session({ session, token }: any) {
      // Send properties to the client
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user = {
        ...session.user,
        ...token.user,
      };
      return session;
    },
  },
  session: {
    strategy: "jwt" as const,
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };