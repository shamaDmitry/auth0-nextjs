"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, LayoutGroup, Variants } from "framer-motion";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

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

export default function AuthPageEnhanced() {
  const [isLogin, setIsLogin] = useState(true);
  const toggleAuthMode = () => setIsLogin(!isLogin);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50/50 p-4 dark:bg-gray-900/50 overflow-hidden">
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
                    <Button variant="outline" className="w-full h-11">
                      <svg
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="google"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 488 512"
                      >
                        <path
                          fill="currentColor"
                          d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                        ></path>
                      </svg>
                      Google
                    </Button>
                  </motion.div>
                  <motion.div
                    variants={buttonInteraction}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button variant="outline" className="w-full h-11">
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
                    onSubmit={(e) => e.preventDefault()}
                    className="grid gap-4"
                  >
                    {!isLogin && (
                      <motion.div
                        variants={itemVariants}
                        className="grid gap-2"
                      >
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="John Doe"
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
                          className="w-full h-11 text-base font-semibold shadow-md"
                          type="submit"
                          size="lg"
                        >
                          {isLogin ? "Sign In" : "Create Account"}
                        </Button>
                      </motion.div>
                    </motion.div>
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
    </div>
  );
}
