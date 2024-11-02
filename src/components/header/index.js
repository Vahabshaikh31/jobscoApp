import { AlignJustify } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";

function Header({ user, profileInfo }) {
  const menuItems = [
    { label: "Home", path: "/", show: true },
    { label: "Login", path: "/sign-in", show: !user },
    { label: "Register", path: "/sign-up", show: !user },
    {
      label: "Activity",
      path: "/activity",
      show: profileInfo?.role === "candidate",
    },
    { label: "Jobs", path: "/jobs", show: !!user },
    { label: "Membership", path: "/membership", show: !!user },
    { label: "Account", path: "/account", show: !!user },
  ];

  return (
    <div>
      <header className="flex h-16 max-w-9xl shrink-0 items-center px-5">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button className="lg:hidden">
              <AlignJustify className="h-6 w-6" />
              <span className="sr-only"> Toggle Navigation Menu </span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="grid gap-2 py-6">
              {menuItems
                .filter((item) => item.show)
                .map((item) => (
                  <Link
                    href={item.path}
                    key={item.label}
                    className="flex w-full items-center py-2 text-lg font-semibold"
                  >
                    {item.label}
                  </Link>
                ))}
              {user && (
                <div className="mt-4">
                  <UserButton afterSignOutUrl="/" />
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo for Both Mobile and Desktop */}
        <Link href="/" className="hidden lg:flex mr-6">
          JOBSCO
        </Link>

        {/* Desktop Navigation */}
        <nav className="ml-auto hidden lg:flex gap-6">
          {menuItems
            .filter((item) => item.show)
            .map((item) => (
              <Link
                key={item.label}
                className="group inline-flex h-9 w-max items-center rounded-md bg-white px-4 py-2 text-sm font-medium"
                href={item.path}
              >
                {item.label}
              </Link>
            ))}
          <UserButton afterSignOutUrl="/" />
        </nav>
      </header>
    </div>
  );
}

export default Header;
