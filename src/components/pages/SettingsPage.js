import { Shield, HelpCircle, Info, ChevronRight } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { DetailedLanguageSelector } from "../LanguageSelector";
import { DetailedThemeToggle } from "../ThemeToggle";

export default function SettingsPage() {
  const { t } = useLanguage();

  const settingSections = [
    {
      title: t("preferences"),
      items: [
        {
          icon: Shield,
          label: t("safetyThreshold"),
          value: t("highSensitivity"),
        },
      ],
    },
    {
      title: t("support"),
      items: [
        { icon: HelpCircle, label: t("helpCenter"), value: t("getSupport") },
        { icon: Info, label: t("aboutApp"), value: t("version") },
      ],
    },
  ];

  return (
    <div className="pb-20 px-4 py-6 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          {t("settings")}
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Manage your PastPick experience
        </p>
      </header>

      {/* Language Selector */}
      <div className="mb-6">
        <DetailedLanguageSelector />
      </div>

      {/* Theme Toggle */}
      <div className="mb-6">
        <DetailedThemeToggle />
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingSections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
              {section.title}
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm overflow-hidden border-gray-200 dark:border-gray-700">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <button
                    key={itemIndex}
                    className={`
                      w-full p-4 flex items-center space-x-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700
                      ${itemIndex !== section.items.length - 1 ? "border-b border-gray-100 dark:border-gray-700" : ""}
                    `}
                  >
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                      <Icon
                        className="text-gray-600 dark:text-gray-300"
                        size={18}
                      />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {item.label}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {item.value}
                      </div>
                    </div>
                    <ChevronRight
                      className="text-gray-400 dark:text-gray-500"
                      size={16}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* App Info */}
      <div className="mt-8 text-center">
        <div className="bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200 p-4 rounded-lg border mb-4">
          <h3 className="font-semibold mb-2">🦷 {t("appName")}</h3>
          <p className="text-sm">
            Making toothpaste ingredient analysis simple and accessible for
            everyone.
          </p>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 {t("appName")}. Made with care for your oral health.
        </p>
      </div>
    </div>
  );
}
