"use client";
import { Info, Database, FileText, FlaskConical } from "lucide-react";

export default function AboutScores() {
  return (
    <div className="min-h-screen px-4 py-16">
      <div className="max-w-2xl mx-auto w-full flex flex-col gap-8">
        <div>
          <p className="text-4xl font-light text-center tracking-tight mb-2">
            About Scoring
          </p>
          <p className="text-sm text-muted-foreground text-center">
            Understanding how we evaluate toothpaste ingredients
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-6 mt-4">
          {/* Introduction */}
          <div className="p-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Some short information should be written here for sure Some short
              information should be written here for sure Some short information
              should be written here for sure
            </p>
          </div>

          {/* Score Scale */}
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <Info size={20} />
              <p className="text-sm font-medium">Score Scale</p>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-light">0</span>
              <div className="flex-1 mx-4 h-2 bg-gradient-to-r from-red-300 via-gray-300 to-primary rounded-full" />
              <span className="text-2xl font-light">10</span>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              0 = Not recommended · 10 = Highly beneficial
            </p>
          </div>

          {/* Scoring Factors */}
          <div className="flex flex-col gap-4 mt-2">
            <p className="text-sm font-medium px-4">
              Scoring is determined by:
            </p>

            {/* Data Source */}
            <div className="flex gap-4 items-start p-4">
              <div className="flex items-center justify-center p-2">
                <Database size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium mb-1">Data Source Quality</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Credibility and reliability of scientific databases,
                  regulatory bodies, and peer-reviewed sources
                </p>
              </div>
            </div>

            {/* Research Amount */}
            <div className="flex gap-4 items-start p-4">
              <div className="flex items-center justify-center p-2">
                <FlaskConical size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium mb-1">Research Volume</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Quantity and consistency of studies supporting or questioning
                  ingredient safety and efficacy
                </p>
              </div>
            </div>

            {/* Research Type */}
            <div className="flex gap-4 items-start p-4">
              <div className="flex items-center justify-center p-2">
                <FileText size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium mb-1">Study Methodology</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Type and quality of research: clinical trials, meta-analyses,
                  regulatory assessments, and long-term safety data
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
