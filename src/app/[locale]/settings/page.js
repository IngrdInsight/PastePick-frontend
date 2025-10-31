import Settings from "./settings";
import pkg from "../../../../package.json";

export default function SettingsPageWrapper() {
  return <Settings appVersion={pkg.version} />;
}
