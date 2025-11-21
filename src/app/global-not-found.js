import Link from "next/link";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import "@/app/globals.css";

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased">
        <div className="min-h-[100vh] flex flex-col justify-center px-4 py-8">
          <div className="max-w-2xl mx-auto w-full flex flex-col items-center gap-8">
            <p className="text-5xl md:text-6xl font-light text-center tracking-tight leading-tight mb-4">
              404
            </p>

            <div className="flex flex-col items-center gap-4">
              <p className="text-2xl font-light text-center tracking-tight">
                Page Not Found
              </p>
              <p className="text-sm text-muted-foreground text-center max-w-md">
                The page you're looking for doesn't exist or has been moved
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4 flex-wrap justify-center">
              <Link href="/">
                <Button variant="outline" className="hover:cursor-pointer">
                  <Home size={18} className="mr-2" />
                  Home
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" className="hover:cursor-pointer">
                  <Search size={18} className="mr-2" />
                  Search Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
