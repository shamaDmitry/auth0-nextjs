"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { resendVerificationEmail } from "@/actions/resendVerificationEmail/action";
import { toast } from "sonner"; // Or your preferred toast library

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export default function SignupSuccess() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const [cooldown, setCooldown] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleResend = async () => {
    if (cooldown > 0 || !email) return;

    setLoading(true);
    try {
      await resendVerificationEmail(email);
      setCooldown(60);

      toast.success("Check your inbox! A new link has been sent.");
    } catch (err) {
      toast.error("Error sending email. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <motion.div
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Animated Checkmark Circle */}
        <motion.div
          className="flex justify-center mb-6"
          variants={itemVariants}
        >
          <div className="bg-green-100 p-4 rounded-full">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2,
              }}
            >
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          className="text-3xl font-bold text-slate-900 mb-4"
          variants={itemVariants}
        >
          Verify your email
        </motion.h1>

        <motion.p
          className="text-slate-600 mb-8 leading-relaxed"
          variants={itemVariants}
        >
          We have sent a verification link to your email address. Please click
          the link to activate your account and get started.
        </motion.p>

        <motion.div className="space-y-4" variants={itemVariants}>
          <Button
            onClick={() => window.open("https://gmail.com", "_blank")}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md"
          >
            <Mail className="w-5 h-5" />
            Open Gmail
          </Button>

          <Link
            href="/login"
            className="w-full text-slate-500 hover:text-slate-700 font-medium py-2 flex items-center justify-center gap-1 transition-all"
          >
            Back to Login <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div
          className="mt-8 pt-6 border-t border-slate-100"
          variants={itemVariants}
        >
          <p className="text-sm text-slate-400">
            Didn&apos;t receive the email? Check your spam folder or
            <Button
              onClick={handleResend}
              disabled={cooldown > 0 || loading}
              className=" font-semibold ml-1 hover:underline disabled:text-slate-300 disabled:no-underline"
            >
              {loading
                ? "Sending..."
                : cooldown > 0
                  ? `Resend in ${cooldown}s`
                  : "resend link"}
            </Button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
