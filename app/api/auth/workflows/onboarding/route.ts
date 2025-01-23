import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import {
  sendCheckinEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "@/lib/mails";
import { serve } from "@upstash/workflow/nextjs";
import { eq } from "drizzle-orm";

type UserState = "non-active" | "active";
type InitialData = {
  email: string;
  fullName: string;
};
const getUserState = async (email: string): Promise<UserState> => {
  // Implement user state logic here
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (user.length === 0) return "non-active";

  const lastActivityDate = new Date(user[0].lastActivityDate!);
  console.log(lastActivityDate);
  const now = new Date();

  const timeDifference = now.getTime() - lastActivityDate.getTime();

  if (timeDifference > ONE_MINUTE_IN_MS) return "non-active";
  //   if (timeDifference > ONE_MINUTE_IN_MS && timeDifference <= FIVE_MINUTES_IN_MS)
  //     return "non-active";

  return "active";
};
// DAYS IN MS
const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const THREE_DAY_IN_MS = 3 * ONE_DAY_IN_MS;
const THIRTY_DAY_IN_MS = 30 * ONE_DAY_IN_MS;

// MINUTES IN MS
const ONE_MINUTE_IN_MS = 60 * 1000;
const FIVE_MINUTES_IN_MS = 5 * ONE_MINUTE_IN_MS;

// export const { POST } = serve<InitialData>(async (context) => {
//   const { email, fullName } = context.requestPayload;

//   // welcome email to new user
//   await context.run("new-signup", async () => {
//     await sendWelcomeEmail(email, fullName);
//   });

//   // go to sleep for 3 days

//   await context.sleep("wait-for-1-minutes", ONE_MINUTE_IN_MS);

//   // check each month
//   while (true) {
//     // get the user state
//     const state = await context.run("check-user-state", async () => {
//       return await getUserState(email);
//     });

//     // if user is not active send this
//     if (state === "non-active") {
//       await context.run("send-email-non-active", async () => {
//         await sendCheckinEmail(email, fullName);
//       });
//       // if user is active send this
//     }
//     // else if (state === "active") {
//     //   await context.run("send-email-active", async () => {
//     //     await sendEmail("Send newsletter to active users", email);
//     //   });
//     // }

//     // then go back to sleep for a month
//     await context.sleep("wait-for-1-minutes", ONE_MINUTE_IN_MS);
//   }
// });

// export const { POST } = serve<InitialData>(async (context) => {
//   const { email, fullName } = context.requestPayload;

//   console.log(`Received new signup request: ${email}, ${fullName}`);

//   // Welcome email to new user
//   await context.run("new-signup", async () => {
//     console.log(`Sending welcome email to ${email}...`);
//     await sendWelcomeEmail(email, fullName);
//   });

//   console.log("Welcome email sent. Sleeping for 1 minute...");

//   // Go to sleep for 1 minute
//   await context.sleep("wait-for-1-minutes", ONE_MINUTE_IN_MS);

//   // Infinite loop for checking user activity
//   while (true) {
//     console.log(`Checking user state for ${email}...`);

//     const state = await context.run("check-user-state", async () => {
//       return await getUserState(email);
//     });

//     console.log(`User state: ${state}`);

//     if (state === "non-active") {
//       console.log(`Sending check-in email to ${email}...`);
//       await context.run("send-email-non-active", async () => {
//         await sendCheckinEmail(email, fullName);
//       });
//     }

//     console.log("Sleeping for 1 minute...");
//     await context.sleep("wait-for-1-minutes", ONE_MINUTE_IN_MS);
//   }
// });

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload;

  console.log(`Received new signup request: ${email}, ${fullName}`);

  // Send a welcome email
  await context.run("new-signup", async () => {
    console.log(`Sending welcome email to ${email}...`);
    await sendWelcomeEmail(email, fullName);
  });

  console.log("Welcome email sent. Sleeping for 1 minute...");

  // Sleep for 1 minute
  await context.sleep("wait-for-1-minute", ONE_MINUTE_IN_MS);

  let lastEmailSent = null;

  // Infinite loop for checking user activity
  while (true) {
    console.log(`Checking user state for ${email}...`);

    const state = await context.run("check-user-state", async () => {
      return await getUserState(email);
    });

    console.log(`User state: ${state}`);

    if (state === "non-active") {
      // Prevent sending duplicate emails by checking last email timestamp
      const now = new Date();
      if (
        !lastEmailSent ||
        now.getTime() - lastEmailSent.getTime() > ONE_MINUTE_IN_MS
      ) {
        console.log(`Sending check-in email to ${email}...`);
        await context.run("send-email-non-active", async () => {
          await sendCheckinEmail(email, fullName);
        });
        lastEmailSent = new Date(); // Update last email sent time
      } else {
        console.log(`Skipping email for ${email}, sent recently.`);
      }
    }

    console.log("Sleeping for 1 minute...");
    await context.sleep("wait-for-1-minute", ONE_MINUTE_IN_MS);
  }
});
