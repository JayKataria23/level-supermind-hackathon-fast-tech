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

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
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
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                  <div className="flex gap-5 items-center font-semibold">
                    <Link href={"/"}>Next.js Supabase Starter</Link>
                    <div className="flex items-center gap-2">
                      <DeployButton />
                    </div>
                  </div>
                  {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                </div>
              </nav>
              <div className="flex flex-col gap-20 max-w-5xl p-5">
                {children}
              </div>

              <footer className="w-full border-t bg-background">
                <div className="max-w-5xl mx-auto py-16 px-5">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Column 1 - Logo & Tagline */}
                    <div className="space-y-4">
                      <div className="text-2xl font-bold">Level Supermind</div>
                      <p className="text-sm text-gray-500">Track Smarter, Learn Better</p>
                    </div>

                    {/* Column 2 - Quick Links */}
                    <div>
                      <h3 className="font-semibold mb-4">Quick Links</h3>
                      <ul className="space-y-2 text-sm text-gray-500">
                        <li><Link href="/features">Features</Link></li>
                        <li><Link href="/team">Team</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                      </ul>
                    </div>

                    {/* Column 3 - Contact */}
                    <div>
                      <h3 className="font-semibold mb-4">Contact</h3>
                      <div className="space-y-2 text-sm text-gray-500">
                        <a href="mailto:jaykataria2004@gmail.com" className="block hover:underline">
                          jaykataria2004@gmail.com
                        </a>
                        <a href="mailto:sisha200316@gmail.com" className="block hover:underline">
                          sisha200316@gmail.com
                        </a>
                      </div>
                    </div>

                    {/* Column 4 - Newsletter */}
                    <div>
                      <h3 className="font-semibold mb-4">Stay Updated</h3>
                      <p className="text-sm text-gray-500 mb-4">Subscribe to our newsletter</p>
                      <div className="flex gap-2">
                        <input 
                          type="email" 
                          placeholder="Enter your email" 
                          className="text-sm px-3 py-2 border rounded-md flex-1 bg-background"
                        />
                        <Button>
                          Subscribe
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Section */}
                  <div className="flex flex-col md:flex-row justify-between items-center mt-16 pt-8 border-t border-gray-800">
                    <p className="text-sm text-gray-500">© 2025 Level Supermind. All rights reserved.</p>
                    <div className="flex items-center gap-6 mt-4 md:mt-0">
                      <Link href="/privacy" className="text-sm text-gray-500 hover:underline">Privacy Policy</Link>
                      <Link href="/terms" className="text-sm text-gray-500 hover:underline">Terms of Service</Link>
                      <ThemeSwitcher />
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
