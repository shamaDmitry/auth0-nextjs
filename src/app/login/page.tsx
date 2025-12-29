import { login, signup } from "@/actions/login/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <form className="flex flex-col gap-3">
        <Label htmlFor="email">Email:</Label>
        <Input id="email" name="email" type="email" required />

        <Label htmlFor="password">Password:</Label>
        <Input id="password" name="password" type="password" required />

        <div className="flex gap-4 items-center justify-center">
          <Button formAction={login}>Log in</Button>
          <Button formAction={signup}>Sign up</Button>
        </div>
      </form>
    </div>
  );
}
