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
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {t("appName")}
          </p>
        </div>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            2,847
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {t("productsScanned")}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            94%
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {t("safeIngredients")}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3 mb-6">
        <button
          onClick={() => onStartCamera && onStartCamera()}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-3 shadow-md hover:from-blue-700 hover:to-blue-800 transition-colors"
        >
          <Camera size={20} />
          <span className="font-semibold">{t("quickScan")}</span>
        </button>

        <button className="w-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 py-3 px-4 rounded-lg flex items-center justify-center space-x-3 shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <Search size={20} />
          <span className="font-semibold">{t("searchProducts")}</span>
        </button>
      </div>

      {/* Features */}
      <div className="space-y-3">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-start space-x-3">
            <Shield
              className="text-green-600 dark:text-green-400 mt-1"
              size={18}
            />
            <div>
              <p className="font-semibold text-gray-900 dark:text-white text-sm">
                {t("safetyAnalysis")}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {t("safetyAnalysisDesc")}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-start space-x-3">
            <TrendingUp
              className="text-blue-600 dark:text-blue-400 mt-1"
              size={18}
            />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                {t("smartRecommendations")}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {t("smartRecommendationsDesc")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          {t("poweredBy")}
        </p>
        <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
          {t("learnHow")}
        </button>
      </div>
    </div>
  );
}
