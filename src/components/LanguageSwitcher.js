"use client";
import { useRouter, usePathname } from "next/navigation";
export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const changeLanguage = (locale) => {
    router.push(`/${locale}${pathname.replace(/^\/(en|fi|se)/, "")}`);
  };
  return (
    <div className="bg-emerald">
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("fi")}>Suomi</button>
    </div>
  );
}
