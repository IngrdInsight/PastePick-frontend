"use client";

import { useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { NODE_BASE_URL } from "@/config.js";

const filterOptions = [
  { value: "whitening", label: "Whitening" },
  { value: "sensitivity", label: "For Sensitive Teeth" },
  { value: "natural", label: "Natural Ingredients" },
  { value: "fluoride", label: "Fluoride-Free" },
  { value: "kids", label: "Kids Friendly" },
];

export default function SearchResults() {
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState("score");
  const [activeFilters, setActiveFilters] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`${NODE_BASE_URL}/api/v1/toothpastes`);
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const getScoreColor = (score) => {
    if (score <= 2) return "bg-red-300";
    if (score <= 5) return "bg-slate-300";
    return "bg-primary";
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col gap-6">
        {/* Search and Actions */}
        <div className="flex flex-col gap-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={20}
            />
            <Input
              placeholder="Search toothpastes, brands, or ingredients"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-10 rounded-full"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Select>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Search toothpastes" />
              </SelectTrigger>
              <SelectContent className="max-h-30">
                <SelectItem>All</SelectItem>
                <SelectItem>For Kids</SelectItem>
                <SelectItem>Whitening</SelectItem>
                <SelectItem>For Kids</SelectItem>
                <SelectItem>For Kids</SelectItem>
              </SelectContent>
            </Select>

            <Link href="/add-new">
              <Button size="sm" className="rounded-full hover:cursor-pointer">
                <Plus size={16} className="mr-2" />
                New Product
              </Button>
            </Link>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-3">
                <div className="text-sm font-medium">Filter by:</div>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.map((filter) => (
                    <Badge
                      key={filter.value}
                      variant={
                        activeFilters.includes(filter.value)
                          ? "default"
                          : "outline"
                      }
                      className="cursor-pointer rounded-full"
                      onClick={() => toggleFilter(filter.value)}
                    >
                      {filter.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Header */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            About {products.length} results
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden transition-all duration-200 ease-in-out hover:shadow-sm hover:scale-[1.02]"
            >
              <a href={`/products/${product.id}`} className="block">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex flex-col gap-2">
                    <Badge
                      className={`w-fit ${getScoreColor(product.overall_score)}`}
                    >
                      Score {product.overall_score}
                    </Badge>
                    <div className="font-medium line-clamp-2">
                      {product.brand}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {product.name}
                    </div>
                  </div>
                </CardContent>
              </a>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
