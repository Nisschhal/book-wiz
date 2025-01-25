import { inngestClient } from "@/inngest";
import { checkin, onboarding, sendWeeklyDigest } from "@/inngest/jobs";
import { serve } from "inngest/next";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngestClient,
  functions: [
    onboarding,
    checkin,
    sendWeeklyDigest,
    /* your functions will be passed here later! */
  ],
});
