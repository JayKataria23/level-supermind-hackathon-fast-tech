import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import { Button } from "@/components/ui/button";
import AnimatedBackground from "@/components/animated-background";
import Image from "next/image";
import logo from "./logo.png";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "ART Finder",
  description: "Your go-to Ad-creation analysis tool",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex-1 w-full flex flex-col min-h-screen">
            <nav className="w-full h-24 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-24 items-center justify-between">
                <div className="flex items-center gap-2 text-4xl">
                  <Image
                    src={logo || "/placeholder.svg"}
                    alt="Application Logo"
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                  <Link href="/" className=" font-bold text-primary">
                    ART Finder
                  </Link>
                </div>
                  <div>
                    <Link href="#features" className="">
                      <Button variant="ghost" className="text-xl">
                        Features
                      </Button>
                    </Link>
                    <Link href="#contact" className="">
                      <Button variant="ghost" className="text-xl">
                        Contact
                      </Button>
                    </Link>
                  </div>
                  <HeaderAuth />
              </div>
            </nav>
            <main className="flex-1">{children}</main>
            <footer className="w-full border-t border-border/40" id="contact">
              <div className="container py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {/* Column 1 - Logo & Tagline */}
                  <div className="space-y-4">
                    <div className="text-2xl font-bold text-primary">
                      Level Supermind
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Track Smarter, Learn Better
                    </p>
                  </div>

                  {/* Column 2 - Quick Links */}
                  <div>
                    <h3 className="font-semibold mb-4 text-foreground">
                      Quick Links
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>
                        <Link
                          href="/features"
                          className="hover:text-primary transition-colors"
                        >
                          Features
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/team"
                          className="hover:text-primary transition-colors"
                        >
                          Team
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/contact"
                          className="hover:text-primary transition-colors"
                        >
                          Contact
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Column 3 - Contact */}
                  <div>
                    <h3 className="font-semibold mb-4 text-foreground">
                      Contact
                    </h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <a
                        href="mailto:jaykataria2004@gmail.com"
                        className="block hover:text-primary transition-colors"
                      >
                        jaykataria2004@gmail.com
                      </a>
                      <a
                        href="mailto:sisha200316@gmail.com"
                        className="block hover:text-primary transition-colors"
                      >
                        sisha200316@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Column 4 - Newsletter */}
                  <div>
                    <h3 className="font-semibold mb-4 text-foreground">
                      Stay Updated
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Subscribe to our newsletter
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 px-3 py-2 text-sm rounded-md bg-background border border-input"
                      />
                      <Button>Subscribe</Button>
                    </div>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mt-16 pt-8 border-t border-border/40">
                  <p className="text-sm text-muted-foreground">
                    © 2025 Level Supermind. All rights reserved.
                  </p>
                  <div className="flex items-center gap-6 mt-4 md:mt-0">
                    <Link
                      href="/privacy"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      Privacy Policy
                    </Link>
                    <Link
                      href="/terms"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      Terms of Service
                    </Link>
                    <ThemeSwitcher />
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
