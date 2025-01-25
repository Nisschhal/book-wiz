import { WelcomeEmailTemplate } from "@/emails";
import { inngestClient } from "..";
import { sendWelcomeEmail } from "@/lib/mails";

export const onboarding = inngestClient.createFunction(
  { id: "send-welcome-email" },
  { event: "app/user.created" },
  async ({ event, step }) => {
    const { email, name } = event.data;
    // get the users
    const welcomeEmailTemplate = await step.run(
      "Generating onboarding Welcome Email Template",
      async () => WelcomeEmailTemplate(name),
    );

    await sendWelcomeEmail(email, name, welcomeEmailTemplate);

    return { message: `Hello ${event.data.name}! Welcome` };
  },
);

// import { sendWelcomeEmail } from "@/lib/mails";

// export const onboarding = inngestClient.createFunction(
//   { id: "send-welcome-email" },
//   { event: "app/user.created" },
//   async ({ event, step }) => {
//     const user = event.data;
//     await step.run("send-email", async () => {
//       // Implement your email sending logic, e.g., using an email service
//       // await sendWelcomeEmail(user.email, html);
//     });
//   },
// );
