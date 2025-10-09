"use client";

import { useState } from "react";
import BottomNavigation from "../components/BottomNavigation";
import HomePage from "../components/pages/HomePage";
import ScanPage from "../components/pages/ScanPage";
import SettingsPage from "../components/pages/SettingsPage";
import ProductPage from "../components/pages/ProductPage";
import CameraScanner from "../components/CameraScanner";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [currentView, setCurrentView] = useState("main");
  const [scannedProduct, setScannedProduct] = useState(null);

  const handleProductScanned = (product = null) => {
    setScannedProduct(product);
    setCurrentView("product");
  };

  const handleStartCamera = () => {
    setCurrentView("camera");
  };

  const handleCameraCapture = (imageData) => {
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
      case "recent":
        return <RecentPage onProductScanned={handleProductScanned} />;
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
      {currentView === "product"
        ? <ProductPage product={scannedProduct} onBack={handleBackToMain} />
        : currentView === "camera"
          ? <CameraScanner
              onClose={handleCameraClose}
              onCapture={handleCameraCapture}
            />
          : <>
              <main className="pt-safe-area">{renderPage()}</main>

              <BottomNavigation
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onStartCamera={handleStartCamera}
              />
            </>}
    </div>
  );
}
