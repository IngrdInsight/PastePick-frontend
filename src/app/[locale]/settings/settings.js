"use client";
import { useEffect, useState } from "react";
import { Sun, Moon, Globe, Bug, Mail } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Settings({ appVersion }) {
  const [language, setLanguage] = useState(useLocale());
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("home");
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("settings");

  const { theme, setTheme } = useTheme();

  const changeLanguage = (locale) => {
    setLanguage(locale);
    const pathWithoutLocale = pathname.replace(/^\/(en|fi|se)/, "");
    router.push(`/${locale}${pathWithoutLocale}`);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen px-4 py-16">
      <div className="max-w-xl mx-auto w-full flex flex-col gap-8">
        {/* Header */}
        <div>
          <p className="text-4xl font-light text-center tracking-tight mb-2">
            {t("title")}
          </p>
          <p className="text-sm text-muted-foreground text-center">
            {t("subtitle")}
          </p>
        </div>

        {/* Settings Options */}
        <div className="flex flex-col gap-4 mt-4">
          {/* Theme */}
          <div className="flex gap-4 items-start p-3">
            <div className="flex items-center justify-center p-2">
              {mounted
                ? theme === "dark"
                  ? <Moon size={20} />
                  : <Sun size={20} />
                : <div className="w-5 h-5" />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium mb-2">{t("theme")}</p>
              {mounted
                ? <Select
                    value={theme}
                    onValueChange={(value) => setTheme(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                    </SelectContent>
                  </Select>
                : <div className="h-10 w-full rounded-md border border-input bg-background" />}
            </div>
          </div>

          {/* Language */}
          <div className="flex gap-4 items-start p-3">
            <div className="flex items-center justify-center p-2">
              <Globe size={20} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium mb-2">{t("language")}</p>
              <Select
                value={language}
                onValueChange={(value) => changeLanguage(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fi">Suomi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="border-t my-4" />

          {/* Support */}
          <div className="flex gap-4 items-start p-3">
            <div className="flex items-center justify-center p-2">
              <Mail size={20} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium mb-2">{t("support")}</p>
              <Button variant="link" className="h-auto p-0 font-normal" asChild>
                <a href="mailto:support@pastepick.com">support@pastepick.com</a>
              </Button>
            </div>
          </div>

          {/* Report Bug */}
          <div className="flex gap-4 items-start p-3">
            <div className="flex items-center justify-center p-2">
              <Bug size={20} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium mb-2">{t("report_bug")}</p>
              <Button variant="link" className="h-auto p-0 font-normal" asChild>
                <a href="blank" target="_blank" rel="noopener noreferrer">
                  {t("report_bug_button")}
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Version */}
        <p className="text-xs text-muted-foreground text-center mt-8">
          {t("version")} {appVersion}
        </p>
      </div>
    </div>
  );
}
