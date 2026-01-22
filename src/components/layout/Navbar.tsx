"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  ShoppingBag,
  Ticket,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/themes/ThemeToggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import { getRole } from "@/lib/utils";
import { useUser } from "@/providers/AuthProvider";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, loading, role } = useUser();

  const isAdmin = role?.slug === "admin";
  const name = user?.user_metadata?.full_name;

  const pathname = usePathname();

  const navLinks = [
    { href: "/coupons", label: "Browse Coupons", icon: Ticket },
  ];

  const isActive = (link: string) => {
    return link && pathname.includes(link);
  };


  console.log({user, loading, role});
  
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-primary">
              <Ticket className="h-5 w-5 text-primary-foreground" />
            </div>

            <span className="text-gradient-primary">CouponHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.href)
                    ? "text-primary underline"
                    : "text-muted-foreground"
                }`}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden items-center gap-4 md:flex">
            {user && !loading ? (
              <>
                <ThemeToggle />

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-full"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {name?.charAt(0) || (
                            <span className="font-bold">U</span>
                          )}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-56 p-1.5" align="end">
                    <div className="flex items-center justify-start gap-2 p-2 w-full">
                      <div className="flex flex-col space-y-1 leading-none flex-1 text-center">
                        <p className="font-medium">{name}</p>

                        <p className="text-sm text-muted-foreground">
                          {user?.email}
                        </p>

                        {role && (
                          <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary justify-center">
                            {getRole(role)}
                          </span>
                        )}
                      </div>
                    </div>

                    <DropdownMenuSeparator />

                    {isAdmin ? (
                      <DropdownMenuItem asChild>
                        <Link
                          href="/admin"
                          className="flex cursor-pointer items-center"
                        >
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem asChild>
                        <Link
                          href="/dashboard"
                          className="flex cursor-pointer items-center"
                        >
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          My Coupons
                        </Link>
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="cursor-pointer text-destructive hover:bg-transparent!">
                      <LogOut className="mr-2 h-4 w-4" />

                      <LogoutButton className="flex-1" variant={"ghost"} />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <ThemeToggle />

                {loading ? (
                  <div className=" border rounded-full animate-pulse bg-secondary size-10"></div>
                ) : (
                  <LoginButton />
                )}
              </>
            )}
          </div>

          <div className="flex gap-5 items-center md:hidden">
            <button
              className="inline-flex items-center justify-center rounded-md p-2 text-foreground "
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-border py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 text-sm font-medium ${
                    isActive(link.href)
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              ))}

              {user ? (
                <>
                  {isAdmin ? (
                    <Link
                      href="/admin"
                      className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Admin Dashboard
                    </Link>
                  ) : (
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <ShoppingBag className="h-4 w-4" />
                      My Coupons
                    </Link>
                  )}

                  <Button variant="outline">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <LoginButton />

                  {user && <LogoutButton />}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
