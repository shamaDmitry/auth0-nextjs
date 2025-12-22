"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginButton() {
  return (
    // <Button asChild>
    //   <Link href="/auth/login">Log In</Link>
    // </Button>

    <a href="/auth/login">Log In</a>
  );
}
