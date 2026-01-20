import LoginForm from "@/components/login/LoginForm";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Suspense fallback={<>...</>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
