import { render } from "@react-email/render";
import WelcomeEmail from "./welcome";

export const WelcomeEmailTemplate = async (userFirstName: string) => {
  const template = await render(
    <WelcomeEmail userFirstname={userFirstName} />,
    {
      pretty: true,
    },
  );
  return template;
};
