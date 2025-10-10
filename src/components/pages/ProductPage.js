"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Heart,
  Share,
  Star,
  Shield,
  CheckCircle,
  AlertTriangle,
  XCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

export default function ProductPage({ product, onBack }) {
  const [activeTab, setActiveTab] = useState("ingredients");

  const sampleProduct = product || {
    name: "Sensodyne Pronamel Gentle Whitening",
    brand: "Sensodyne",
    image: "🦷",
    overallScore: 8.7,
    totalIngredients: 12,
    overallAssessment: "Excellent choice with high-quality, safe ingredients",
    keyIngredients: {
      positive: ["Potassium Nitrate", "Sodium Fluoride", "Calcium Carbonate"],
      negative: ["Titanium Dioxide", "Sodium Lauryl Sulfate"],
    },
    primaryConcerns: [
      "May cause irritation in sensitive individuals",
      "Contains whitening agents under review",
    ],
    primaryBenefits: [
      "Reduces sensitivity",
      "Prevents cavities",
      "Strengthens enamel",
    ],
    scoreBreakdown: {
      beneficial: 5,
      moderate: 4,
      concerning: 2,
      unknown: 1,
    },
  };

  const getScoreColor = (score) => {
    if (score >= 8.5) return "text-success bg-success-light border-success";
    if (score >= 7.0) return "text-primary bg-primary-light border-primary";
    if (score >= 5.5) return "text-warning bg-warning-light border-warning";
    if (score >= 3.5) return "text-orange-600 bg-orange-50 border-orange-200";
    return "text-error bg-error-light border-error";
  };

  const getScoreLabel = (score) => {
    if (score >= 8.5) return "Excellent";
    if (score >= 7.0) return "Good";
    if (score >= 5.5) return "Average";
    if (score >= 3.5) return "Below Average";
    return "Poor";
  };

  const getScoreIcon = (score) => {
    if (score >= 8.5) return <CheckCircle size={20} />;
    if (score >= 7.0) return <Shield size={20} />;
    if (score >= 5.5) return <AlertTriangle size={20} />;
    return <XCircle size={20} />;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "ingredients":
        return <IngredientsTab product={sampleProduct} />;
      case "summary":
        return <SummaryTab product={sampleProduct} />;
      case "concerns":
        return <ConcernsTab product={sampleProduct} />;
      case "benefits":
        return <BenefitsTab product={sampleProduct} />;
      default:
        return <IngredientsTab product={sampleProduct} />;
    }
  };

  return (
    <div className="min-h-screen bg-background-secondary">
      {/* Header */}
      <header className="bg-card-bg shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-background-secondary rounded-full transition-colors"
          >
            <ArrowLeft size={24} className="text-foreground" />
          </button>
          <p className="font-semibold text-foreground">Ingredient Analysis</p>
          <div className="flex space-x-2">
            <button className="p-2 hover:bg-background-secondary rounded-full transition-colors">
              <Heart size={20} className="text-foreground" />
            </button>
            <button className="p-2 hover:bg-background-secondary rounded-full transition-colors">
              <Share size={20} className="text-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Product Overview */}
      <div className="bg-card-bg p-6">
        {/* Product Image and Basic Info */}
        <div className="flex items-start space-x-4 mb-6">
          <div className="w-20 h-20 bg-background-tertiary rounded-lg flex items-center justify-center text-4xl">
            {sampleProduct.image}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-foreground mb-1">
              {sampleProduct.name}
            </h2>
            <p className="text-foreground-secondary mb-3">
              {sampleProduct.brand}
            </p>
            <div className="flex items-center space-x-2">
              <Star className="text-warning" size={16} />
              <span className="text-sm font-medium text-foreground">4.5/5</span>
              <span className="text-sm text-foreground-muted">
                ({sampleProduct.totalIngredients} ingredients analyzed)
              </span>
            </div>
          </div>
        </div>

        {/* Overall Score */}
        <div className="text-center mb-6">
          <div className="inline-flex flex-col items-center">
            <div className="text-5xl font-bold text-primary mb-2">
              {sampleProduct.overallScore}
            </div>
            <div className="text-lg font-medium text-foreground mb-1">
              {getScoreLabel(sampleProduct.overallScore)}
            </div>
            <div className="text-sm text-foreground-secondary mb-3">
              Overall Safety Score (1-10)
            </div>

            {/* Score visualization */}
            <div className="w-48 h-3 bg-background-tertiary rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  sampleProduct.overallScore >= 8.5
                    ? "bg-success"
                    : sampleProduct.overallScore >= 7.0
                      ? "bg-primary"
                      : sampleProduct.overallScore >= 5.5
                        ? "bg-warning"
                        : sampleProduct.overallScore >= 3.5
                          ? "bg-orange-500"
                          : "bg-error"
                }`}
                style={{ width: `${(sampleProduct.overallScore / 10) * 100}%` }}
              ></div>
            </div>

            <p className="text-sm text-foreground-secondary mt-2 max-w-sm">
              {sampleProduct.overallAssessment}
            </p>
          </div>
        </div>

        {/* Key Ingredients Impact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Positive Ingredients */}
          {sampleProduct.keyIngredients.positive.length > 0 && (
            <div className="bg-success-light border border-success rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <TrendingUp className="text-success" size={18} />
                <h3 className="font-semibold text-foreground">Key Benefits</h3>
              </div>
              <div className="space-y-1">
                {sampleProduct.keyIngredients.positive.map(
                  (ingredient, index) => (
                    <div
                      key={index}
                      className="text-sm text-foreground flex items-center space-x-2"
                    >
                      <CheckCircle size={14} />
                      <span>{ingredient}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}

          {/* Negative Ingredients */}
          {sampleProduct.keyIngredients.negative.length > 0 && (
            <div className="bg-error-light border border-error rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <TrendingDown className="text-error" size={18} />
                <h3 className="font-semibold text-foreground">Main Concerns</h3>
              </div>
              <div className="space-y-1">
                {sampleProduct.keyIngredients.negative.map(
                  (ingredient, index) => (
                    <div
                      key={index}
                      className="text-sm text-foreground flex items-center space-x-2"
                    >
                      <AlertTriangle size={14} />
                      <span>{ingredient}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}
        </div>

        {/* Score Breakdown */}
        <div className="bg-background-secondary rounded-lg p-4">
          <h3 className="font-semibold text-foreground mb-3">
            Ingredient Categories
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">
                {sampleProduct.scoreBreakdown.beneficial}
              </div>
              <div className="text-xs text-foreground-secondary">
                Beneficial
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {sampleProduct.scoreBreakdown.moderate}
              </div>
              <div className="text-xs text-foreground-secondary">Moderate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {sampleProduct.scoreBreakdown.concerning}
              </div>
              <div className="text-xs text-foreground-secondary">
                Concerning
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground-muted">
                {sampleProduct.scoreBreakdown.unknown}
              </div>
              <div className="text-xs text-foreground-secondary">Unknown</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-card-bg border-b border-border">
        <div className="flex overflow-x-auto">
          {[
            { id: "ingredients", label: "Ingredients" },
            { id: "summary", label: "Summary" },
            { id: "concerns", label: "Concerns" },
            { id: "benefits", label: "Benefits" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-foreground-muted hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 pb-20">{renderTabContent()}</div>
    </div>
  );
}

// Ingredients Tab Component
function IngredientsTab({ product }) {
  const ingredients = [
    {
      name: "Potassium Nitrate",
      purpose: "Desensitizing agent",
      score: 9.2,
      category: "beneficial",
      description:
        "Helps reduce tooth sensitivity by blocking pain signals to nerves",
      concerns: [],
      benefits: ["Reduces sensitivity", "Clinically proven", "FDA approved"],
    },
    {
      name: "Sodium Fluoride",
      purpose: "Anticavity agent",
      score: 9.0,
      category: "beneficial",
      description: "Prevents tooth decay and strengthens enamel",
      concerns: [],
      benefits: ["Prevents cavities", "Strengthens enamel", "ADA recommended"],
    },
    {
      name: "Hydrated Silica",
      purpose: "Mild abrasive",
      score: 7.2,
      category: "moderate",
      description: "Helps remove plaque and surface stains gently",
      concerns: ["May be abrasive with excessive use"],
      benefits: ["Effective cleaning", "Whitening properties"],
    },
    {
      name: "Titanium Dioxide",
      purpose: "Whitening agent",
      score: 6.5,
      category: "concerning",
      description: "Provides whitening and opacity to toothpaste",
      concerns: [
        "Potential respiratory irritant",
        "Under regulatory review",
        "May cause inflammation",
      ],
      benefits: ["Whitening effect", "Color enhancement"],
    },
    {
      name: "Sodium Lauryl Sulfate",
      purpose: "Foaming agent",
      score: 4.2,
      category: "concerning",
      description: "Creates foam and helps distribute toothpaste",
      concerns: [
        "May cause mouth ulcers",
        "Can irritate sensitive gums",
        "Strips natural oils",
      ],
      benefits: ["Creates foam", "Helps cleaning action"],
    },
  ];

  const getCategoryColor = (category, score) => {
    switch (category) {
      case "beneficial":
        return "bg-success-light text-success border-success";
      case "moderate":
        return "bg-primary-light text-primary border-primary";
      case "concerning":
        return "bg-error-light text-error border-error";
      default:
        return "bg-background-tertiary text-foreground-muted border-border";
    }
  };

  const getScoreColor = (score) => {
    if (score >= 8.5) return "text-success";
    if (score >= 7.0) return "text-primary";
    if (score >= 5.5) return "text-warning";
    if (score >= 3.5) return "text-orange-600";
    return "text-error";
  };

  return (
    <div className="p-4 space-y-4">
      <div className="text-sm text-foreground-secondary mb-4">
        Found {ingredients.length} ingredients • Analyzed with our safety
        database
      </div>

      {ingredients.map((ingredient, index) => (
        <div
          key={index}
          className="bg-card-bg p-4 rounded-lg shadow-sm border border-card-border"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">
                {ingredient.name}
              </h3>
              <p className="text-sm text-foreground-secondary mb-2">
                {ingredient.purpose}
              </p>
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium border ${getCategoryColor(ingredient.category)}`}
              >
                {ingredient.category.charAt(0).toUpperCase() +
                  ingredient.category.slice(1)}
              </span>
            </div>
            <div className="text-right ml-4">
              <div
                className={`text-xl font-bold ${getScoreColor(ingredient.score)}`}
              >
                {ingredient.score}/10
              </div>
              <div className="text-xs text-foreground-muted">Safety Score</div>
            </div>
          </div>

          <p className="text-sm text-foreground mb-3">
            {ingredient.description}
          </p>

          {ingredient.benefits.length > 0 && (
            <div className="mb-2">
              <div className="text-xs font-medium text-success mb-1">
                Benefits:
              </div>
              <div className="flex flex-wrap gap-1">
                {ingredient.benefits.map((benefit, i) => (
                  <span
                    key={i}
                    className="text-xs bg-success-light text-success px-2 py-1 rounded"
                  >
                    {benefit}
                  </span>
                ))}
              </div>
            </div>
          )}

          {ingredient.concerns.length > 0 && (
            <div>
              <div className="text-xs font-medium text-error mb-1">
                Concerns:
              </div>
              <div className="space-y-1">
                {ingredient.concerns.map((concern, i) => (
                  <div
                    key={i}
                    className="text-xs text-error flex items-center space-x-2"
                  >
                    <AlertTriangle size={12} />
                    <span>{concern}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Summary Tab Component
function SummaryTab({ product }) {
  return (
    <div className="p-4 space-y-6">
      <div className="bg-card-bg p-4 rounded-lg shadow-sm border border-card-border">
        <h3 className="font-semibold text-foreground mb-3">Overall Analysis</h3>
        <p className="text-foreground text-sm leading-relaxed mb-4">
          This toothpaste received a score of{" "}
          <strong>{product.overallScore}/10</strong> based on the analysis of{" "}
          {product.totalIngredients} ingredients.
          {product.overallAssessment}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-success-light rounded-lg">
            <div className="text-2xl font-bold text-success">
              {product.scoreBreakdown.beneficial}
            </div>
            <div className="text-sm text-foreground">
              Beneficial Ingredients
            </div>
          </div>
          <div className="text-center p-3 bg-error-light rounded-lg">
            <div className="text-2xl font-bold text-error">
              {product.scoreBreakdown.concerning}
            </div>
            <div className="text-sm text-foreground">
              Concerning Ingredients
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <CheckCircle className="text-success" size={16} />
            <span className="text-sm text-foreground">
              Contains proven effective ingredients for oral health
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="text-primary" size={16} />
            <span className="text-sm text-foreground">
              Generally safe for daily use by most adults
            </span>
          </div>
          {product.scoreBreakdown.concerning > 0 && (
            <div className="flex items-center space-x-2">
              <AlertTriangle className="text-warning" size={16} />
              <span className="text-sm text-foreground">
                Contains some ingredients that may cause sensitivity in certain
                individuals
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-card-bg p-4 rounded-lg shadow-sm border border-card-border">
        <h3 className="font-semibold text-foreground mb-3">Recommendations</h3>
        <div className="space-y-2 text-sm text-foreground">
          {product.overallScore >= 8.5 && (
            <p>
              ✅ <strong>Highly Recommended:</strong> This is an excellent
              choice for most people with high safety standards.
            </p>
          )}
          {product.overallScore >= 7.0 && product.overallScore < 8.5 && (
            <p>
              👍 <strong>Good Choice:</strong> Solid formulation with mostly
              beneficial ingredients.
            </p>
          )}
          {product.overallScore >= 5.5 && product.overallScore < 7.0 && (
            <p>
              ⚠️ <strong>Use with Caution:</strong> Consider alternatives if you
              have sensitive teeth or gums.
            </p>
          )}
          {product.overallScore < 5.5 && (
            <p>
              ❌ <strong>Not Recommended:</strong> Consider switching to a
              product with fewer concerning ingredients.
            </p>
          )}

          <p>• Use twice daily for best results</p>
          <p>• Discontinue use if irritation occurs</p>
          <p>• Consult your dentist for personalized advice</p>
        </div>
      </div>
    </div>
  );
}

// Concerns Tab Component
function ConcernsTab({ product }) {
  return (
    <div className="p-4 space-y-4">
      <div className="text-sm text-foreground-secondary mb-4">
        Potential issues identified in this product
      </div>

      {product.primaryConcerns.length > 0
        ? <div className="space-y-4">
            {product.primaryConcerns.map((concern, index) => (
              <div
                key={index}
                className="bg-error-light border border-error p-4 rounded-lg"
              >
                <div className="flex items-start space-x-3">
                  <AlertTriangle
                    className="text-error mt-1 flex-shrink-0"
                    size={18}
                  />
                  <div>
                    <p className="text-foreground font-medium text-sm mb-2">
                      {concern}
                    </p>
                    <div className="text-foreground-secondary text-xs">
                      <p>
                        <strong>What this means:</strong> This ingredient may
                        cause adverse reactions in some individuals.
                      </p>
                      <p>
                        <strong>Who should be careful:</strong> People with
                        sensitive teeth, gums, or known allergies.
                      </p>
                      <p>
                        <strong>What to do:</strong> Monitor your reaction and
                        discontinue if irritation occurs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-primary-light border border-primary p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Shield className="text-primary mt-1" size={18} />
                <div>
                  <h3 className="text-foreground font-medium text-sm mb-2">
                    General Safety Tips
                  </h3>
                  <ul className="text-foreground-secondary text-xs space-y-1">
                    <li>
                      • Always read ingredient labels if you have known
                      allergies
                    </li>
                    <li>• Start with small amounts when trying new products</li>
                    <li>
                      • Consult your dentist if you experience persistent
                      irritation
                    </li>
                    <li>
                      • Keep products away from children under 6 years old
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        : <div className="text-center py-8">
            <CheckCircle className="mx-auto text-success mb-4" size={48} />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No Major Concerns
            </h3>
            <p className="text-foreground-secondary text-sm">
              This product has no significant safety concerns for most users.
            </p>
          </div>}
    </div>
  );
}

// Benefits Tab Component
function BenefitsTab({ product }) {
  return (
    <div className="p-4 space-y-4">
      <div className="text-sm text-foreground-secondary mb-4">
        Key benefits and positive aspects of this product
      </div>

      {product.primaryBenefits.length > 0
        ? <div className="space-y-4">
            {product.primaryBenefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-success-light border border-success p-4 rounded-lg"
              >
                <div className="flex items-start space-x-3">
                  <CheckCircle
                    className="text-success mt-1 flex-shrink-0"
                    size={18}
                  />
                  <div>
                    <p className="text-foreground font-medium text-sm mb-2">
                      {benefit}
                    </p>
                    <div className="text-foreground-secondary text-xs">
                      <p>
                        This ingredient or property contributes positively to
                        oral health and safety.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-card-bg border border-card-border p-4 rounded-lg">
              <h3 className="font-semibold text-foreground mb-3">
                Why These Ingredients Matter
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    🦷 Oral Health Benefits
                  </h4>
                  <ul className="text-foreground-secondary space-y-1 text-xs">
                    <li>• Cavity prevention</li>
                    <li>• Enamel strengthening</li>
                    <li>• Plaque reduction</li>
                    <li>• Sensitivity relief</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    ✅ Safety Benefits
                  </h4>
                  <ul className="text-foreground-secondary space-y-1 text-xs">
                    <li>• FDA approved ingredients</li>
                    <li>• Clinically tested</li>
                    <li>• Natural components</li>
                    <li>• Low irritation risk</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        : <div className="text-center py-8">
            <AlertTriangle className="mx-auto text-warning mb-4" size={48} />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Limited Benefits
            </h3>
            <p className="text-foreground-secondary text-sm">
              This product has fewer beneficial ingredients than recommended.
            </p>
          </div>}
    </div>
  );
}
