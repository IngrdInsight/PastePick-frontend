"use client";
import { Info, Database, FileText, FlaskConical } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AboutScores() {
  const t = useTranslations("about_scores");
  return (
    <div className="min-h-screen px-4 py-16">
      <div className="max-w-2xl mx-auto w-full flex flex-col gap-8">
        <div>
          <p className="text-4xl font-light text-center tracking-tight mb-2">
            {t("title")}
          </p>
          <p className="text-sm text-muted-foreground text-center">
            {t("subtitle")}
          </p>
        </div>

        <div className="flex flex-col gap-6 mt-4">
          <div className="p-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t("intro_text")}
            </p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <Info size={20} />
              <p className="text-sm font-medium">{t("score_scale_title")}</p>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-light">
                {t("score_scale_range_start")}
              </span>
              <div className="flex-1 mx-4 h-2 bg-gradient-to-r from-red-300 via-gray-300 to-primary rounded-full" />
              <span className="text-2xl font-light">
                {t("score_scale_range_end")}
              </span>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              {t("score_scale_description")}
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-2">
            <p className="text-sm font-medium px-4">{t("factors_title")}</p>

            <div className="flex gap-4 items-start p-4">
              <div className="flex items-center justify-center p-2">
                <Database size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium mb-1">
                  {t("factor_data_source_title")}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t("factor_data_source_description")}
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-4">
              <div className="flex items-center justify-center p-2">
                <FlaskConical size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium mb-1">
                  {t("factor_research_volume_title")}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t("factor_research_volume_description")}
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-4">
              <div className="flex items-center justify-center p-2">
                <FileText size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium mb-1">
                  {t("factor_methodology_title")}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t("factor_methodology_description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
