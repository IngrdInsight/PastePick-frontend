"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";

export default function ThemeToggle({ showLabel = true, size = "default" }) {
  const { theme, toggleTheme, isDark } = useTheme();
  const { t } = useLanguage();

  const sizeClasses = {
    small: {
      container: "w-12 h-6",
      knob: "w-5 h-5",
      translate: isDark ? "translate-x-6" : "translate-x-0.5",
      icon: 14,
    },
    default: {
      container: "w-14 h-7",
      knob: "w-6 h-6",
      translate: isDark ? "translate-x-7" : "translate-x-0.5",
      icon: 16,
    },
    large: {
      container: "w-16 h-8",
      knob: "w-7 h-7",
      translate: isDark ? "translate-x-8" : "translate-x-0.5",
      icon: 18,
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <div className="flex items-center justify-between">
      {showLabel && (
        <div className="flex items-center space-x-2">
          <Moon className="text-gray-600 dark:text-gray-400" size={20} />
          <span className="font-medium text-gray-900 dark:text-white">
            {t("darkMode")}
          </span>
        </div>
      )}

      {/* Toggle Switch */}
      <button
        onClick={toggleTheme}
        className={`
          relative ${currentSize.container} rounded-full transition-colors duration-300 ease-in-out
          ${isDark ? "bg-blue-600" : "bg-gray-300"}
        `}
        aria-label="Toggle theme"
      >
        {/* Knob */}
        <div
          className={`
            absolute top-0.5 ${currentSize.knob} bg-white rounded-full shadow-md
            transform transition-transform duration-300 ease-in-out
            flex items-center justify-center
            ${currentSize.translate}
          `}
        >
          {isDark
            ? <Moon className="text-blue-600" size={currentSize.icon} />
            : <Sun className="text-yellow-500" size={currentSize.icon} />}
        </div>
      </button>

      {showLabel && (
        <span className="text-sm text-gray-600 dark:text-gray-400 ml-3">
          {isDark ? t("darkTheme") : t("lightTheme")}
        </span>
      )}
    </div>
  );
}

// Compact version for navbar/header
export function CompactThemeToggle() {
  const { toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark
        ? <Sun className="text-gray-300" size={20} />
        : <Moon className="text-gray-600" size={20} />}
    </button>
  );
}

// Settings page version - detailed with card style
export function DetailedThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme();
  const { t } = useLanguage();

  return (
    <div className="p-4 rounded-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          {t("darkMode")}
        </h3>
      </div>

      <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
        <div className="flex items-center space-x-3">
          <div
            className={`p-2 rounded-lg ${isDark ? "bg-blue-100 dark:bg-blue-900" : "bg-yellow-100"}`}
          >
            {isDark
              ? <Moon className="text-blue-600 dark:text-blue-400" size={20} />
              : <Sun className="text-yellow-600" size={20} />}
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">
              {isDark ? t("darkTheme") : t("lightTheme")}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {isDark ? "Dark mode active" : "Light mode active"}
            </div>
          </div>
        </div>

        {/* Toggle Switch */}
        <button
          onClick={toggleTheme}
          className={`
            relative w-14 h-7 rounded-full transition-colors duration-300 ease-in-out
            ${isDark ? "bg-blue-600" : "bg-gray-300"}
          `}
          aria-label="Toggle theme"
        >
          <div
            className={`
              absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md
              transform transition-transform duration-300 ease-in-out
              ${isDark ? "translate-x-7" : "translate-x-0.5"}
            `}
          />
        </button>
      </div>
    </div>
  );
}
