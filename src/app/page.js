"use client";

import { useState } from "react";
import BottomNavigation from "../components/BottomNavigation";
import HomePage from "../components/pages/HomePage";
import ScanPage from "../components/pages/ScanPage";
import SettingsPage from "../components/pages/SettingsPage";
import ProductPage from "../components/pages/ProductPage";
import SimpleCameraScanner from "../components/CameraScanner";
import { useTheme } from "../contexts/ThemeContext";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [currentView, setCurrentView] = useState("main"); // 'main', 'product', or 'camera'
  const [scannedProduct, setScannedProduct] = useState(null);
  const { isDark } = useTheme();

  const handleProductScanned = (product = null) => {
    setScannedProduct(product);
    setCurrentView("product");
  };

  const handleStartCamera = () => {
    setCurrentView("camera");
  };

  const handleCameraCapture = (imageData) => {
    // Here you would process the captured image
    // For now, we'll simulate the scan result
    const mockProduct = {
      name: "Scanned Toothpaste Product",
      brand: "Unknown Brand",
      image: "📷",
      overallScore: 78,
    };
    setScannedProduct(mockProduct);
    setCurrentView("product");
  };

  const handleCameraClose = () => {
    setCurrentView("main");
  };

  const handleBackToMain = () => {
    setCurrentView("main");
    setScannedProduct(null);
  };

  const renderPage = () => {
    switch (activeTab) {
      case "home":
        return (
          <HomePage
            onProductScanned={handleProductScanned}
            onStartCamera={handleStartCamera}
          />
        );
      case "scan":
        return (
          <ScanPage
            onProductScanned={handleProductScanned}
            onStartCamera={handleStartCamera}
          />
        );
      case "settings":
        return <SettingsPage />;
      default:
        return (
          <HomePage
            onProductScanned={handleProductScanned}
            onStartCamera={handleStartCamera}
          />
        );
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-gray-900" : "bg-gradient-to-br from-blue-50 to-green-50"
      }`}
    >
      {currentView === "product"
        ? <ProductPage product={scannedProduct} onBack={handleBackToMain} />
        : currentView === "camera"
          ? <SimpleCameraScanner
              onClose={handleCameraClose}
              onCapture={handleCameraCapture}
            />
          : <>
              {/* Page Content */}
              <main className="pt-safe-area">{renderPage()}</main>

              {/* Bottom Navigation */}
              <BottomNavigation
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onStartCamera={handleStartCamera}
              />
            </>}
    </div>
  );
}
