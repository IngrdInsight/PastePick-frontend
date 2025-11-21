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
import { useTranslations } from "next-intl";

export default function NewToothpasteForm() {
  const router = useRouter();
  const t = useTranslations("add_new");
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
      alert(t("error_fill_all"));
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
        alert(t("error_submit_failed"));
      }
    } catch (err) {
      console.error(err);
      alert(t("error_network"));
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
            {t("back")}
          </Button>

          <p className="text-4xl font-light text-center tracking-tight mb-2">
            {t("title")}
          </p>
          <p className="text-sm text-muted-foreground text-center">
            {t("subtitle")}
          </p>
        </div>

        <FieldGroup>
          <Card className="bg-background">
            <CardContent className="p-6">
              <FieldLabel className="mb-3 block">{t("image_label")}</FieldLabel>

              {!imagePreview
                ? <label className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                    <Upload size={32} className="text-muted-foreground mb-3" />
                    <p className="text-sm font-medium mb-1">
                      {t("image_upload_title")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("image_upload_description")}
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
              <FieldLabel htmlFor="brand">{t("brand_label")}</FieldLabel>
              <Input
                id="brand"
                placeholder={t("brand_placeholder")}
                value={formData.brand}
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="name">{t("name_label")}</FieldLabel>
              <Input
                id="name"
                placeholder={t("name_placeholder")}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Field>
          </FieldSet>

          <FieldSet>
            <Field>
              <FieldLabel htmlFor="ingredients">
                {t("ingredients_label")}
              </FieldLabel>
              <FieldDescription>
                {t("ingredients_description")}
              </FieldDescription>
              <Textarea
                id="ingredients"
                placeholder={t("ingredients_placeholder")}
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
            <Button onClick={handleSubmit}>{t("submit")}</Button>
            <Button variant="outline">{t("cancel")}</Button>
          </Field>
        </FieldGroup>
      </div>
    </div>
  );
}
