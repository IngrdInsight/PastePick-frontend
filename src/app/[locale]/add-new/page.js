"use client";
import { useState } from "react";
import { ChevronLeft, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { useRouter } from "next/navigation";
import { NODE_BASE_URL } from "@/config.js";

export default function NewToothpasteForm() {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    brand: "",
    name: "",
    ingredients: "",
  });

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
  };

  const handleSubmit = async () => {
    if (
      !formData.brand ||
      !formData.name ||
      !formData.ingredients ||
      !imageFile
    ) {
      alert("Please fill in all fields");
      return;
    }
    const ingredientsArray = Array.from(
      new Set(
        formData.ingredients
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item.length >= 3),
      ),
    );

    const formDataToSend = new FormData();
    formDataToSend.append("brand", formData.brand);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("ingredients", JSON.stringify(ingredientsArray));
    formDataToSend.append("file", imageFile);

    try {
      const res = await fetch(`${NODE_BASE_URL}/api/v1/toothpastes/new`, {
        method: "POST",
        body: formDataToSend,
      });

      if (res.ok) {
        router.push("/products");
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert("Failed");
      }
    } catch (err) {
      console.error(err);
      alert("Network error — please try again later.");
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
            Add New Toothpaste
          </p>
          <p className="text-sm text-muted-foreground text-center">
            Enter product details to analyze ingredients
          </p>
        </div>

        <FieldGroup>
          <Card className="bg-background">
            <CardContent className="p-6">
              <FieldLabel className="mb-3 block">Product Image</FieldLabel>

              {!imagePreview
                ? <label className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                    <Upload size={32} className="text-muted-foreground mb-3" />
                    <p className="text-sm font-medium mb-1">
                      Upload product image
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG up to 10MB
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
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

          <FieldSet>
            <Field>
              <FieldLabel htmlFor="brand">Brand</FieldLabel>
              <Input
                id="brand"
                placeholder="e.g., Colgate"
                value={formData.brand}
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="name">Product Name</FieldLabel>
              <Input
                id="name"
                placeholder="e.g., Total Advanced Whitening"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Field>
          </FieldSet>

          <FieldSet>
            <Field>
              <FieldLabel htmlFor="ingredients">Ingredients List</FieldLabel>
              <FieldDescription>
                Enter the full ingredients list as shown on the product
                packaging. Separate ingredients with commas.
              </FieldDescription>
              <Textarea
                id="ingredients"
                placeholder="e.g., Sodium Fluoride, Sorbitol, Water, Hydrated Silica, Glycerin, PEG-12..."
                value={formData.ingredients}
                onChange={(e) =>
                  setFormData({ ...formData, ingredients: e.target.value })
                }
                rows={5}
                className="resize-none"
              />
            </Field>
          </FieldSet>

          <Field orientation="vertical">
            <Button onClick={handleSubmit}>Submit</Button>
            <Button variant="outline">Cancel</Button>
          </Field>
        </FieldGroup>
      </div>
    </div>
  );
}
