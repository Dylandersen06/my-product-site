import { after } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { syncUser, syncedRecently } from "@/lib/users-db";

/** Copies the signed-in user into the Neon users table, after the page is sent. Renders nothing. */
export default async function UserSync() {
  const { userId } = await auth();
  if (userId && !syncedRecently(userId)) {
    after(async () => {
      try {
        const user = await (await clerkClient()).users.getUser(userId);
        await syncUser(user);
      } catch (error) {
        console.error("user sync lookup failed", error instanceof Error ? error.message : error);
      }
    });
  }
  return null;
}
