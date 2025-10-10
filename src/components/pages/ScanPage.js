import { Camera, Upload, Type, Zap } from "lucide-react";

export default function ScanPage({ onProductScanned, onStartCamera }) {
  return (
    <div className="pb-20 px-4 py-6">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Scan Product
        </h1>
        <p className="text-foreground-secondary text-sm">
          Analyze toothpaste ingredients instantly
        </p>
      </header>

      {/* Camera Preview Area */}
      <div className="mb-8">
        <div className="bg-background-tertiary rounded-xl h-64 flex items-center justify-center border-2 border-dashed border-border">
          <div className="text-center">
            <Camera className="mx-auto text-foreground-muted mb-3" size={48} />
            <p className="text-foreground-muted text-sm">
              Camera preview will appear here
            </p>
          </div>
        </div>
      </div>

      {/* Scan Options */}
      <div className="space-y-4 mb-6">
        <button
          onClick={() => onStartCamera && onStartCamera()}
          className="w-full bg-primary hover:bg-primary-hover text-white py-4 px-6 rounded-xl flex items-center justify-center space-x-3 shadow-lg transition-colors"
        >
          <Camera size={24} />
          <span className="text-lg font-semibold">Start Camera Scan</span>
        </button>

        <button className="w-full bg-card-bg text-foreground py-4 px-6 rounded-xl flex items-center justify-center space-x-3 shadow-md border border-card-border hover:bg-background-secondary transition-colors">
          <Upload size={24} />
          <span className="text-lg font-semibold">Upload from Gallery</span>
        </button>

        <button className="w-full bg-card-bg text-foreground py-4 px-6 rounded-xl flex items-center justify-center space-x-3 shadow-md border border-card-border hover:bg-background-secondary transition-colors">
          <Type size={24} />
          <span className="text-lg font-semibold">Type Ingredients</span>
        </button>
      </div>

      {/* Quick Tips */}
      <div className="bg-primary-light p-4 rounded-lg border border-primary">
        <div className="flex items-start space-x-3">
          <Zap className="text-primary mt-1" size={16} />
          <div>
            <h3 className="font-semibold text-foreground text-sm mb-1">
              Scanning Tips
            </h3>
            <ul className="text-xs text-foreground-secondary space-y-1">
              <li>• Ensure good lighting</li>
              <li>• Hold camera steady</li>
              <li>• Focus on ingredients list</li>
              <li>• Keep text clear and readable</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
