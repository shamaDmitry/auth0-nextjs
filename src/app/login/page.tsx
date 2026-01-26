import LoginForm from "@/components/login/LoginForm";
import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center">
      <Suspense
        fallback={
          <>
            <Spinner className="size-12 text-red-500" />
          </>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
