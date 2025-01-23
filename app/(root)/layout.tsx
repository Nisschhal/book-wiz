import { auth } from "@/auth";
import Header from "@/components/Header";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { after } from "next/server";
import React, { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");

  // update the user last activity after page load
  after(async () => {
    if (!session?.user?.id) return;

    // get user and see last activity date is today
    // const user = await db
    //   .select()
    //   .from(users)
    //   .where(eq(users.id, session.user.id))
    //   .limit(1);

    // return if today was the last activity date
    // if (user[0].lastActivityDate === new Date().toISOString().slice(0, 10))
    //   return;

    // await db
    //   .update(users)
    //   .set({ lastActivityDate: new Date().toISOString().slice(0, 10) }); // just day, month, and not time

    await db
      .update(users)
      .set({ lastActivityDate: new Date() })
      .where(eq(users.email, session.user.email!));
  });

  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <Header session={session} />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
