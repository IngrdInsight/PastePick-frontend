"use client";

import { Button } from "@/components/ui/button";
import { Home, ScanLine, Settings, Database } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Navigation({}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = params?.locale || "en";
  const t = useTranslations("navigation");

  const tabs = [
    { id: "home", label: t("home"), icon: Home, href: `/${locale}` },
    { id: "scan", label: t("scan"), icon: ScanLine, href: `/${locale}/scan` },
    {
      id: "products",
      label: t("products"),
      icon: Database,
      href: `/${locale}/products`,
    },
    {
      id: "settings",
      label: t("settings"),
      icon: Settings,
      href: `/${locale}/settings`,
    },
  ];

  const handleClick = (tab) => {
    router.push(tab.href);
  };

  return (
    <>
      {/* Mobile - Bottom */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-background p-3">
        <div className="max-w-lg mx-auto flex justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = pathname === tab.href;

            return (
              <button
                key={tab.id}
                onClick={() => handleClick(tab)}
                className="flex flex-col items-center gap-1 flex-1 transition-opacity"
                style={{ opacity: isActive ? 1 : 0.7 }}
              >
                <div
                  className={`p-2 rounded-xl transition-colors ${
                    isActive ? "bg-primary/10" : ""
                  }`}
                >
                  <Icon
                    size={22}
                    strokeWidth={isActive ? 2.5 : 2}
                    className={
                      isActive ? "text-primary" : "text-muted-foreground"
                    }
                  />
                </div>
                <span
                  className={`text-xs ${
                    isActive
                      ? "font-semibold text-primary"
                      : "font-medium text-muted-foreground"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Desktop - Sidebar */}
      <nav className="hidden md:flex fixed left-0 top-0 h-screen w-60 border-r bg-background p-4 flex-col gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;

          return (
            <Button
              key={tab.id}
              variant={isActive ? "secondary" : "ghost"}
              onClick={() => handleClick(tab)}
              className="justify-start h-12 rounded-3xl transition-all"
            >
              <Icon
                size={20}
                strokeWidth={isActive ? 2.5 : 2}
                className="mr-2"
              />
              <span className={isActive ? "font-semibold" : "font-medium"}>
                {tab.label}
              </span>
            </Button>
          );
        })}
      </nav>
    </>
  );
}
