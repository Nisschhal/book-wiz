"use server";

import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import ratelimit from "../ratelimit";
import { redirect } from "next/navigation";

// you can pick types from auth credentials
export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">,
) => {
  const { email, password } = params;

  // add rate limit, incase bot or dos attack
  /**
   * get the user ip address or default ip: 127.0.0.1
   * use that ip address to set limit
   */
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";

  const { success, reset } = await ratelimit.limit(ip);
  console.log("Rate limit result:", { ip, success, reset });

  if (!success) {
    console.log("Rate limit enforced, redirecting...");
    redirect("/too-fast");
  }

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result.error) {
      return { success: false, error: result.error };
    }

    return { success: true };
  } catch (error) {
    console.log("Signin error", error);
    return { success: false, error: "Signin error!" };
  }
};

export const signUp = async (params: AuthCredentials) => {
  const { fullName, email, password, universityId, universityCard } = params;

  // add rate limit, incase bot or dos attack
  /**
   * get the user ip address or default ip: 127.0.0.1
   * use that ip address to set limit
   */
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";

  const { success, reset } = await ratelimit.limit(ip);
  console.log("Rate limit result:", { ip, success, reset });

  if (!success) {
    console.log("Rate limit enforced, redirecting...");
    redirect("/too-fast");
  }

  // Continue with the rest of the signup logic
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (existingUser.length > 0) {
    return { success: false, error: "Email already exist!" };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(users).values({
      fullName,
      email,
      password: hashedPassword,
      universityId,
      universityCard,
    });

    // TODO: auto sign in when success
    await signInWithCredentials({ email, password });
    return { success: true };
  } catch (error) {
    console.log("Error creating user", error);
    return { success: false, error: "Signup error!" };
  }
};
