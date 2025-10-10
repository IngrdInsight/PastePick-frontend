import { Home, Heart, Scan, Clock, Settings } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export default function BottomNavigation({
  activeTab,
  onTabChange,
  onStartCamera,
}) {
  const { t } = useLanguage();

  const tabs = [
    { id: "home", label: t("home"), icon: Home },
    { id: "scan", label: t("scan"), icon: Scan },
    { id: "settings", label: t("settings"), icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card-bg border-t border-border px-2 py-2 safe-area-pb">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isScan = tab.id === "scan";

          return (
            <button
              key={tab.id}
              onClick={() => {
                if (isScan && onStartCamera) {
                  onStartCamera();
                } else {
                  onTabChange(tab.id);
                }
              }}
              className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 transition-all duration-200 ${
                isScan ? "transform -translate-y-2" : ""
              }`}
            >
              {/* Special styling for scan button */}
              {isScan
                ? <div
                    className={`p-3 rounded-full shadow-lg transition-colors ${
                      isActive
                        ? "bg-primary text-white"
                        : "bg-primary text-white hover:bg-primary-hover"
                    }`}
                  >
                    <Icon size={24} />
                  </div>
                : <div
                    className={`p-2 rounded-lg transition-colors ${
                      isActive
                        ? "text-primary bg-primary-light"
                        : "text-foreground-muted hover:text-foreground"
                    }`}
                  >
                    <Icon size={20} />
                  </div>}

              {/* Label */}
              <span
                className={`text-xs mt-1 font-medium transition-colors ${
                  isActive ? "text-primary" : "text-foreground-muted"
                } ${isScan ? "text-primary" : ""}`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
