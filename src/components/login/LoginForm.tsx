"use client";

import React, { useActionState, useState } from "react";
import { useSearchParams } from "next/navigation";
import { login, signInWithProvider, signup } from "@/actions/login/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatePresence, LayoutGroup, motion, Variants } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github } from "lucide-react";
import Link from "next/link";
import { Spinner } from "../ui/spinner";

const initialState = {
  message: "",
  error: "",
};

const containerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.42, 0, 0.21, 1], // Cubic bezier for smooth entrance
      when: "beforeChildren", // Animate container first
      staggerChildren: 0.1, // Delay between each child appearing
    },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

const buttonInteraction: Variants = {
  hover: {
    scale: 1.02,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  },
  tap: { scale: 0.98 },
};

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const toggleAuthMode = () => setIsLogin(!isLogin);

  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/coupons";

  const [loginState, loginAction, isLoginPending] = useActionState(
    login,
    initialState,
  );
  const [signupState, signupAction, isSignupPending] = useActionState(
    signup,
    initialState,
  );

  return (
    <>
      <LayoutGroup>
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{
            layout: {
              duration: 0.3,
              type: "spring",
              stiffness: 300,
              damping: 30,
            },
          }}
          className="w-full max-w-md relative z-10"
        >
          <Card className="border-none shadow-2xl overflow-hidden backdrop-blur-sm bg-background/95">
            <CardHeader className="space-y-1 text-center pb-2">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isLogin ? "login-text" : "signup-text"}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardTitle className="text-3xl font-bold tracking-tight">
                    {isLogin ? "Welcome back" : "Create account"}
                  </CardTitle>

                  <CardDescription className="mt-2 text-base">
                    {isLogin
                      ? "Enter your details below to sign in"
                      : "Get started with your free account"}
                  </CardDescription>
                </motion.div>
              </AnimatePresence>
            </CardHeader>

            <CardContent className="grid gap-6">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  variants={itemVariants}
                  className="grid grid-cols-2 gap-4"
                >
                  <motion.div
                    variants={buttonInteraction}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button
                      variant="outline"
                      className="w-full h-11"
                      onClick={() => signInWithProvider("google")}
                    >
                      Google
                    </Button>
                  </motion.div>

                  <motion.div
                    variants={buttonInteraction}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button
                      variant="outline"
                      className="w-full h-11"
                      onClick={() => signInWithProvider("github")}
                    >
                      <Github className="mr-2 h-5 w-5" />
                      GitHub
                    </Button>
                  </motion.div>
                </motion.div>

                <motion.div variants={itemVariants} className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>

                  <div className="relative flex justify-center text-sm uppercase">
                    <span className="bg-background px-3 text-muted-foreground font-medium">
                      Or continue with
                    </span>
                  </div>
                </motion.div>

                <AnimatePresence mode="wait">
                  <motion.form
                    key={isLogin ? "login-form" : "signup-form"}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={containerVariants}
                    layout
                    // onSubmit={(e) => e.preventDefault()}
                    className="grid gap-4"
                  >
                    <input type="hidden" name="redirectTo" value={redirectTo} />

                    {!isLogin && (
                      <motion.div
                        variants={itemVariants}
                        className="grid gap-2"
                      >
                        <Label htmlFor="full_name">Full Name</Label>
                        <Input
                          id="full_name"
                          name="full_name"
                          type="text"
                          placeholder="John Doe"
                          defaultValue={"John Doe"}
                          className="h-11 transition-all focus-visible:ring-2 focus-visible:ring-primary/50"
                        />
                      </motion.div>
                    )}

                    <motion.div variants={itemVariants} className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        className="h-11 transition-all focus-visible:ring-2 focus-visible:ring-primary/50"
                        name="email"
                        defaultValue={"dmitry.shama@faceit.com.ua"}
                      />
                    </motion.div>

                    <motion.div variants={itemVariants} className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>

                        {isLogin && (
                          <Link
                            href="#"
                            className="text-sm text-primary hover:underline font-medium"
                          >
                            Forgot password?
                          </Link>
                        )}
                      </div>

                      <Input
                        id="password"
                        type="password"
                        required
                        name="password"
                        defaultValue={"test123"}
                        className="h-11 transition-all focus-visible:ring-2 focus-visible:ring-primary/50"
                      />
                    </motion.div>

                    <motion.div variants={itemVariants} className="pt-2">
                      <motion.div
                        variants={buttonInteraction}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <Button
                          formAction={isLogin ? loginAction : signupAction}
                          disabled={isLoginPending || isSignupPending}
                          className="w-full h-11 text-base font-semibold shadow-md"
                          size="lg"
                        >
                          {isLogin ? (
                            <>{isLoginPending ? <Spinner /> : "Log in"}</>
                          ) : (
                            <>
                              {isSignupPending ? <Spinner /> : "Create Account"}
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </motion.div>

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
                  </motion.form>
                </AnimatePresence>
              </motion.div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-2 pb-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-sm text-center text-muted-foreground"
              >
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <Button onClick={toggleAuthMode} variant="link">
                  {isLogin ? "Sign up now" : "Log in here"}
                </Button>
              </motion.div>
            </CardFooter>
          </Card>
        </motion.div>
      </LayoutGroup>

      {/* <form className="flex flex-col gap-3">
        <input type="hidden" name="redirectTo" value={redirectTo} />

        <Label htmlFor="email">Email:</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          defaultValue={"dmitry.shama@faceit.com.ua"}
        />

        <Label htmlFor="password">Password:</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          defaultValue={"test123"}
        />

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

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Button variant="outline" onClick={() => signInWithProvider("google")}>
          Google
        </Button>

        <Button variant="outline" onClick={() => signInWithProvider("github")}>
          GitHub
        </Button>
      </div> */}
    </>
  );
}
