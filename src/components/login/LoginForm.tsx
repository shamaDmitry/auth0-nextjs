"use client";

import React, { useActionState } from "react";
import { login, signup } from "@/actions/login/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState = {
  message: "",
  error: "",
};

export default function LoginForm() {
  const [loginState, loginAction, isLoginPending] = useActionState(
    login,
    initialState
  );
  const [signupState, signupAction, isSignupPending] = useActionState(
    signup,
    initialState
  );

  return (
    <>
      <form className="flex flex-col gap-3">
        <Label htmlFor="email">Email:</Label>
        <Input id="email" name="email" type="email" required />

        <Label htmlFor="password">Password:</Label>
        <Input id="password" name="password" type="password" required />

        {/* <div className="flex gap-4 items-center justify-center">
          <Button
            formAction={async (formData) => {
              await login(formData);
            }}
          >
            Log in
          </Button>

          <Button
            formAction={async (formData) => {
              await signup(formData);
            }}
          >
            Sign up
          </Button>
        </div> */}

        {loginState?.error && (
          <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
            {loginState.error}
          </div>
        )}
        {signupState?.error && (
          <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
            {signupState.error}
          </div>
        )}

        <div className="flex gap-4 mt-4">
          {/* 3. Use `formAction` on buttons to trigger specific server actions */}
          <Button
            formAction={loginAction}
            disabled={isLoginPending}
            className=""
            variant={"default"}
          >
            {isLoginPending ? "Logging in..." : "Log in"}
          </Button>

          <Button
            formAction={signupAction}
            disabled={isSignupPending}
            variant={"secondary"}
          >
            {isSignupPending ? "Signing up..." : "Sign up"}
          </Button>
        </div>
      </form>
    </>
  );
}
