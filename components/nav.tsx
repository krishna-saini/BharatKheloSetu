import Link from "next/link";
import Image from "next/image";

export function Nav() {
  return (
    <header className="border-b bg-white">
      <nav className="container-page flex h-16 sm:h-20 items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Bharat Khelo Setu"
            width={1023}
            height={143}
            priority
            className="h-10 sm:h-14 w-auto object-contain"
          />
        </Link>
      </nav>
    </header>
  );
}

