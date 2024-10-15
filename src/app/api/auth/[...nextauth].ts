import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
  throw new Error("Missing GitHub OAuth credentials");
}

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  // Add any additional configuration here
});

export { handler as GET, handler as POST };
