"use client";

import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ExternalLink,
  ShieldAlert,
  Info,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { useParams, useRouter } from "next/navigation";
import { NODE_BASE_URL } from "@/config.js";
import { useTranslations } from "next-intl";

export default function ProductDetail() {
  const [expandedId, setExpandedId] = useState(null);
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const t = useTranslations("product_details");

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`${NODE_BASE_URL}/api/v1/toothpastes/${id}`);
        if (!res.ok) {
          if (res.status === 404) {
            setError("Product not found");
          } else {
            setError("Failed to fetch product");
          }
          return;
        }

        const data = await res.json();
        setProduct(data.data);
      } catch (err) {
        console.error(err);
        setError("Network error");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  const getScoreColor = (score) => {
    if (score <= 2) return "bg-red-300";
    if (score <= 5) return "bg-slate-300";
    return "bg-primary";
  };

  const getScoreLabel = (score) => {
    if (score <= 2) return "High Concern";
    if (score <= 5) return "Moderate";
    return "Low Concern";
  };

  const toggleIngredient = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const activeCategories = (product) => {
    const categories = [];
    if (!product) return [];


    if (product.is_whitening) categories.push("Whitening");
    if (product.for_kids) categories.push("Kids");
    if (product.is_fluoride_free) categories.push("Fluoride Free");
    if (product.for_sensitive_teeth) categories.push("Sensitive");

    return categories;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground text-sm">{t("loading")}</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <p className="text-2xl font-semibold mb-2">{t("not_found_title")}</p>
        <p className="text-muted-foreground mb-4">{t("not_found_message")}</p>
        <Button variant="outline" onClick={() => router.push("/")}>
          {t("go_back_home")}
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ChevronLeft size={16} className="mr-1" />
            {t("back")}
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Product Info - Mobile/Tablet: Full width, Desktop: Sidebar */}
          <div className="lg:col-span-1">
            <Card className="lg:sticky lg:top-6">
              <CardContent className="p-4 sm:p-6">
                <div className="aspect-square overflow-hidden rounded-lg mb-4 sm:mb-6 bg-muted">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <div className="font-medium text-xl sm:text-2xl mb-1">
                      {product.brand}
                    </div>
                    <div className="text-sm sm:text-base text-muted-foreground">
                      {product.name}
                    </div>
                  </div>

                  <div className="py-4 sm:py-6 border-y">
                    <div className="text-sm text-muted-foreground mb-3">
                      {t("overall_safety_score")}
                    </div>
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-16 h-16 sm:w-20 sm:h-20 ${getScoreColor(product.overall_score)} rounded-full flex items-center justify-center text-background text-2xl sm:text-3xl font-medium`}
                      >
                        {product.overall_score}
                      </div>
                      <div>
                        <div className="font-medium mb-1">
                          {getScoreLabel(product.overall_score)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {t("out_of_10")}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex flex-col gap-2">
                      <span className="text-muted-foreground">
                        {t("category")}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {activeCategories(product).length > 0
                          ? activeCategories(product).map((cat) => (
                              <span
                                key={cat}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                              >
                                {cat}
                              </span>
                            ))
                          : <span className="text-muted-foreground italic">
                            </span>}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {t("last_updated")}
                      </span>
                      <span className="font-medium">
                        {product.updated_at &&
                        !isNaN(new Date(product.updated_at))
                          ? new Date(product.updated_at).toLocaleDateString(
                              "en-GB",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ingredients List */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <div>
              <div className="flex items-baseline justify-between mb-4 sm:mb-6">
                <p className="text-xl sm:text-2xl font-medium">
                  {t("ingredients_title")} ({product.ingredients.length})
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                  {t("tap_to_view_details")}
                </p>
              </div>

              <div className="space-y-2 sm:space-y-3">
                {product.ingredients.map((ingredient) => (
                  <Card
                    key={ingredient.id}
                    className="overflow-hidden transition-shadow hover:shadow-md"
                  >
                    {/* Clickable Header */}
                    <button
                      onClick={() => toggleIngredient(ingredient.id)}
                      className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center gap-3 sm:gap-4 text-left hover:bg-muted/50 transition-colors"
                    >
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 ${getScoreColor(ingredient.safety_score)} rounded-lg flex items-center justify-center text-background text-base sm:text-lg font-medium flex-shrink-0`}
                      >
                        {ingredient.safety_score}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm sm:text-base mb-0.5 sm:mb-1">
                          {ingredient.name}
                        </div>
                        <div className="text-xs sm:text-sm text-muted-foreground">
                          {ingredient.category}
                        </div>
                      </div>
                      <ChevronDown
                        size={20}
                        className={`flex-shrink-0 text-muted-foreground transition-transform ${expandedId === ingredient.id ? "rotate-180" : ""}`}
                      />
                    </button>

                    {/* Expandable Content */}
                    {expandedId === ingredient.id && (
                      <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t">
                        <div className="space-y-4 sm:space-y-6 pt-4 sm:pt-6">
                          {/* Concerns */}
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <ShieldAlert
                                size={18}
                                className="text-muted-foreground flex-shrink-0"
                              />
                              <p className="font-medium text-sm sm:text-base">
                                {t("known_concerns")}
                              </p>
                            </div>
                            <ul className="space-y-2 pl-0 sm:pl-7">
                              {ingredient.risks}
                            </ul>
                          </div>

                          {/* Benefits */}
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <Info
                                size={18}
                                className="text-muted-foreground flex-shrink-0"
                              />
                              <p className="font-medium text-sm sm:text-base">
                                {t("benefits_title")}
                              </p>
                            </div>
                            <ul className="space-y-2 pl-0 sm:pl-7">
                              {ingredient.benefits}
                            </ul>
                          </div>

                          {/* Safety Information */}
                          <div className="bg-muted/50 rounded-lg p-3 sm:p-4">
                            <p className="font-medium mb-2 text-sm">
                              {t("safety_assessment")}
                            </p>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {ingredient.regulatory_notes}
                            </p>
                          </div>

                          {/* Data Sources */}
                          <div className="bg-muted/50 rounded-lg p-3 sm:p-4">
                            <p className="font-medium mb-3 text-sm">
                              {t("evidence_level")}: {ingredient.evidence_level}
                            </p>
                            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-3">
                              <a
                                href={ingredient.link_cosing}
                                className="inline-flex items-center gap-1.5 text-sm hover:underline"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <ExternalLink size={14} />
                                Cosing
                              </a>
                              <a
                                href={ingredient.link_echa}
                                className="inline-flex items-center gap-1.5 text-sm hover:underline"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <ExternalLink size={14} />
                                Echa
                              </a>
                              <a
                                href={ingredient.link_pubchem}
                                className="inline-flex items-center gap-1.5 text-sm hover:underline"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <ExternalLink size={14} />
                                PubChem
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>

            {/* Score Reference */}
            <Card className="bg-muted/30">
              <CardContent className="p-4 sm:p-6">
                <p className="font-medium mb-4 text-sm sm:text-base">
                  {t("score_reference_title")}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl sm:text-2xl font-medium">1</span>
                  <div className="flex-1 mx-4 sm:mx-6 h-1.5 bg-gradient-to-r from-red-300 via-gray-300 to-primary rounded-full" />
                  <span className="text-xl sm:text-2xl font-medium">10</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{t("low_concern")}</span>
                  <span>{t("moderate")}</span>
                  <span>{t("high_concern")}</span>
                </div>
                <p className="text-xs text-muted-foreground border-t pt-3 mt-2">
                  * Scores and safety assessments are generated by AI, and based
                  on ingredient data. Please consult a professional for medical
                  advice.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
