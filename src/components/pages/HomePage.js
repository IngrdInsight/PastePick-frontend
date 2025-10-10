import {
  Camera,
  Search,
  Shield,
  Sparkles,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

export default function HomePage({ onProductScanned, onStartCamera }) {
  const { t } = useLanguage();

  return (
    <div className="pb-20 px-4 py-6">
      {/* Header */}
      <header className="text-center mb-8">
        <div className="flex items-center justify-center mb-3">
          <p className="text-3xl font-extrabold text-brand">{t("appName")}</p>
        </div>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-card-bg p-4 rounded-lg shadow-sm border border-card-border text-center">
          <div className="text-2xl font-bold text-primary">2,847</div>
          <div className="text-xs text-foreground-muted">
            {t("productsScanned")}
          </div>
        </div>
        <div className="bg-card-bg p-4 rounded-lg shadow-sm border border-card-border text-center">
          <div className="text-2xl font-bold text-success">94%</div>
          <div className="text-xs text-foreground-muted">
            {t("safeIngredients")}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3 mb-6">
        <button
          onClick={() => onStartCamera && onStartCamera()}
          className="w-full bg-primary hover:bg-primary-hover text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-3 shadow-md transition-colors"
        >
          <Camera size={20} />
          <span className="font-semibold">{t("quickScan")}</span>
        </button>

        <button className="w-full bg-card-bg text-foreground py-3 px-4 rounded-lg flex items-center justify-center space-x-3 shadow-sm border border-card-border hover:bg-background-secondary transition-colors">
          <Search size={20} />
          <span className="font-semibold">{t("searchProducts")}</span>
        </button>
      </div>

      {/* Features */}
      <div className="space-y-3">
        <div className="bg-card-bg p-4 rounded-lg shadow-sm border border-card-border">
          <div className="flex items-start space-x-3">
            <Shield className="text-success mt-1" size={18} />
            <div>
              <p className="font-semibold text-foreground text-sm">
                {t("safetyAnalysis")}
              </p>
              <p className="text-xs text-foreground-secondary">
                {t("safetyAnalysisDesc")}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card-bg p-4 rounded-lg shadow-sm border border-card-border">
          <div className="flex items-start space-x-3">
            <TrendingUp className="text-primary mt-1" size={18} />
            <div>
              <h3 className="font-semibold text-foreground text-sm">
                {t("smartRecommendations")}
              </h3>
              <p className="text-xs text-foreground-secondary">
                {t("smartRecommendationsDesc")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8">
        <p className="text-xs text-foreground-muted mb-4">{t("poweredBy")}</p>
        <button className="text-primary text-sm font-medium hover:text-primary-hover transition-colors">
          {t("learnHow")}
        </button>
      </div>
    </div>
  );
}
