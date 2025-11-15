"use client";
import { useState, useRef } from "react";
import { Camera, Upload, X, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { useRouter } from "next/navigation";
import { PYTHON_BASE_URL } from "@/config.js";

export default function ScanProductPage() {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processImage(file);
    }
  };

  const processImage = (file) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      alert("Please select or capture an image");
      return;
    }

    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append("file", imageFile);

    try {
      const res = await fetch(`${PYTHON_BASE_URL}/api/search-by-image`, {
        method: "POST",
        body: formDataToSend,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.results.length > 0) {
          router.push(`/products/${data.results[0].id}`);
        } else {
          router.push("/products");
        }
      } else {
        alert("Product not found");
      }
    } catch (err) {
      console.error(err);
      alert("Network error — please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-16">
      <div className="max-w-3xl mx-auto w-full flex flex-col gap-8">
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="mb-6 -ml-2"
            onClick={() => router.back()}
          >
            <ChevronLeft size={16} className="mr-1" />
            Back
          </Button>

          <p className="text-4xl font-light text-center tracking-tight mb-2">
            Scan Product
          </p>
          <p className="text-sm text-muted-foreground text-center">
            Upload or capture an image to identify the product
          </p>
        </div>

        <Card className="bg-background">
          <CardContent className="p-6">
            <FieldLabel className="mb-3 block">Product Image</FieldLabel>

            {!imagePreview
              ? <div className="space-y-3">
                  <label className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                    <Camera size={32} className="text-muted-foreground mb-3" />
                    <p className="text-sm font-medium mb-1">Take Photo</p>
                    <p className="text-xs text-muted-foreground">
                      Use your camera to capture
                    </p>
                    <input
                      ref={cameraInputRef}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </label>

                  <label className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                    <Upload size={32} className="text-muted-foreground mb-3" />
                    <p className="text-sm font-medium mb-1">
                      Upload from Device
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG up to 10MB
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </label>
                </div>
              : <div className="relative">
                  <div className="aspect-square overflow-hidden rounded-lg bg-muted">
                    <img
                      src={imagePreview}
                      alt="Product preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={removeImage}
                  >
                    <X size={16} />
                  </Button>
                </div>}
          </CardContent>
        </Card>

        <div className="flex flex-col gap-2">
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Scanning..." : "Scan Product"}
          </Button>
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
