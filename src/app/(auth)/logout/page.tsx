import { LogoutForm } from "./form";

export default function LogoutPage() {
  return (
    <div className="container flex flex-col items-center space-y-6">
      <header className="text-center">
        <h1 className="text-3xl font-medium">Logout</h1>
        <p className="text-sm text-muted-foreground">
          You are about to sign out of your account.
        </p>
      </header>
      <LogoutForm />
    </div>
  );
}
