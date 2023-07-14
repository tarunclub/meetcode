import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <Link href="/problems">Problems</Link>
      <Link href="/profile">Profile</Link>
      <Link href="/auth/login">Login</Link>
      <Link href="/Signup">Signup</Link>
    </main>
  );
}
