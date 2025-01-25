import config from "@/lib/config";
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
// import logo from "./slogo.jpg";
import * as React from "react";

interface WelcomeEmailProps {
  userFirstname: string;
}

export const WelcomeEmail = ({ userFirstname }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>
      The sales intelligence platform that helps you uncover qualified leads.
    </Preview>
    <Tailwind>
      <Body style={main}>
        <Container style={container}>
          <div className="flex gap-2">
            <Img
              src="https://ik.imagekit.io/nischaldev/slogo.jpg?updatedAt=1737816347418"
              alt="Cat"
              width="20"
              height="20"
              style={{
                textAlign: "center",
              }}
            />
            Book Wiz
          </div>
          <Text style={paragraph}>Hi {userFirstname},</Text>
          <Text style={paragraph}>
            Welcome to Book Wiz! Explore our wide range of books across various
            genres, designed to support your learning and spark your curiosity.
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href={config.env.domain}>
              Get started
            </Button>
          </Section>
          <Text style={paragraph}>
            Best,
            <br />
            The Book Wiz Univerisity
          </Text>
          <Hr style={hr} />
          <Text style={footer}>Book Wiz Univerisity</Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

WelcomeEmail.PreviewProps = {
  userFirstname: "Alan",
} as WelcomeEmailProps;

export default WelcomeEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#E7C9A5",
  borderRadius: "3px",
  color: "#0F172A",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
