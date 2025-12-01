"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Info, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { NODE_BASE_URL } from "@/config.js";

export default function Home() {
  const t = useTranslations("home");
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [statsData, setStatsData] = useState({});
  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(`${NODE_BASE_URL}/api/v1/stats`);
        if (!res.ok) {
          return;
        }

        const data = await res.json();
        if (data?.data) {
          setStatsData(data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
      }
    }

    fetchStats();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchValue)}`);
    } else {
      router.push('/products');
    }
  };

  const stats = [
    { value: statsData.total_toothpastes || 0, label: t("toothpastes") },
    { value: statsData.total_ingredients || 0, label: t("ingredients") },
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
              placeholder={t("search_placeholder")}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch(e);
                }
              }}
              className="pl-12 h-12 rounded-full"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4 flex-wrap justify-center">
            <Link href="/about-scores">
              <Button variant="outline" className="hover:cursor-pointer">
                <Info size={18} className="mr-2" />
                {t("how_we_determine_scores")}
              </Button>
            </Link>
            <Link href="/add-new">
              <Button variant="outline" className="hover:cursor-pointer">
                <Plus size={18} className="mr-2" />
                {t("add_your_product")}
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
