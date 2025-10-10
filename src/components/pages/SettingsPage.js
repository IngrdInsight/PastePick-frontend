import {
  Shield,
  HelpCircle,
  Info,
  ChevronRight,
  Moon,
  Sun,
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";
import { DetailedLanguageSelector } from "../LanguageSelector";

export default function SettingsPage() {
  const { t } = useLanguage();
  const { theme, changeTheme, actualTheme } = useTheme();

  const themeOptions = [
    { id: "light", label: t("lightTheme"), icon: Sun },
    { id: "dark", label: t("darkTheme"), icon: Moon },
  ];

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
    <div className="pb-20 px-4 py-6 min-h-screen bg-background-secondary">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold mb-2 text-foreground">
          {t("settings")}
        </h1>
        <p className="text-sm text-foreground-secondary">
          Manage your PastPick experience
        </p>
      </header>

      {/* Language Selector */}
      <div className="mb-6">
        <DetailedLanguageSelector />
      </div>

      {/* Dark Mode Toggle */}
      <div className="mb-6">
        <div className="p-4 rounded-lg border bg-card-bg border-card-border">
          <h3 className="font-semibold mb-3 text-foreground">
            {t("darkMode")}
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {themeOptions.map((themeOption) => {
              const Icon = themeOption.icon;
              const isActive =
                theme === themeOption.id ||
                (theme === "system" && actualTheme === themeOption.id);

              return (
                <button
                  key={themeOption.id}
                  onClick={() => changeTheme(themeOption.id)}
                  className={`
                    p-4 rounded-lg border text-center transition-all flex flex-col items-center space-y-2
                    ${
                      isActive
                        ? "border-primary bg-primary-light"
                        : "border-border hover:border-border-secondary hover:bg-background-secondary"
                    }
                  `}
                >
                  <Icon size={24} className="text-foreground" />
                  <div className="font-medium text-foreground">
                    {themeOption.label}
                  </div>
                  {isActive && (
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingSections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h2 className="text-lg font-semibold mb-3 text-foreground">
              {section.title}
            </h2>
            <div className="bg-card-bg rounded-lg border shadow-sm overflow-hidden border-card-border">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <button
                    key={itemIndex}
                    className={`
                      w-full p-4 flex items-center space-x-3 transition-colors hover:bg-background-secondary
                      ${itemIndex !== section.items.length - 1 ? "border-b border-border" : ""}
                    `}
                  >
                    <div className="p-2 rounded-lg bg-background-tertiary">
                      <Icon className="text-foreground-secondary" size={18} />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-foreground">
                        {item.label}
                      </div>
                      <div className="text-sm text-foreground-secondary">
                        {item.value}
                      </div>
                    </div>
                    <ChevronRight className="text-foreground-muted" size={16} />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* App Info */}
      <div className="mt-8 text-center">
        <div className="bg-primary-light border-primary text-foreground p-4 rounded-lg border mb-4">
          <h3 className="font-semibold mb-2">🦷 {t("appName")}</h3>
          <p className="text-sm">
            Making toothpaste ingredient analysis simple and accessible for
            everyone.
          </p>
        </div>
        <p className="text-xs text-foreground-muted">
          © 2024 {t("appName")}. Made with care for your oral health.
        </p>
      </div>
    </div>
  );
}
