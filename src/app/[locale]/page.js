"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Info, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");

  const stats = [
    { value: "135", label: "Toothpastes" },
    { value: "191", label: "Ingredients" },
  ];

  return (
    <main>
      <div className="min-h-[100vh] flex flex-col justify-center px-4 py-8">
        <div className="max-w-2xl mx-auto w-full flex flex-col items-center gap-8">
          <p className="text-5xl md:text-6xl font-light text-center tracking-tight leading-tight mb-4">
            PastePick
          </p>

          {/* Search Bar */}
          <div className="relative w-full max-w-[600px]">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={24}
            />
            <Input
              placeholder="Search for an ingredient, brand or product"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-12 h-12 rounded-full"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4 flex-wrap justify-center">
            <Link href="/about-scores">
              <Button variant="outline" className="hover:cursor-pointer">
                <Info size={18} className="mr-2" />
                How we determine scores
              </Button>
            </Link>
            <Link href="/add-new">
              <Button variant="outline" className="hover:cursor-pointer">
                <Plus size={18} className="mr-2" />
                Add your product
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-8 mt-12 w-full max-w-[600px]">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1"
              >
                <div className="text-4xl font-light leading-none">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
