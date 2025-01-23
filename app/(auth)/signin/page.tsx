"use client";
import AuthForm from "@/components/AuthForm";
import { signInSchema, signUpSchema } from "@/lib/validations";
import React from "react";

const Page = () => {
  return (
    <AuthForm
      type="SIGN_IN"
      schema={signInSchema}
      defaultValues={{
        email: "",
        password: "",
      }}
      onSubmit={() => {}}
    />
  );
};

export default Page;
