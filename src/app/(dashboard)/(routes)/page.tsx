import { UserButton, SignedIn, SignedOut, SignIn } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <SignedIn>
        <h1>Dashboard</h1>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <SignIn />
      </SignedOut>
    </div>
  );
}