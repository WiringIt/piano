import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "lucide-react";

const AIImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateImage = async () => {
    if (!prompt) return;

    setLoading(true);
    setImage(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (response.ok) {
        const data = await response.json();
        setImage(data.image);
      } else {
        alert("Error generating image. Try again.");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="text-center">
          <h2 className="text-2xl font-bold">AI Image Generator</h2>
          <p className="text-sm text-gray-500">Generate unique images based on your prompt</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the image you want to generate..."
              className="resize-none"
            />
            <Button
              onClick={handleGenerateImage}
              disabled={loading || !prompt}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              {loading ? <Loader className="animate-spin mr-2" /> : "Generate Image"}
            </Button>
            {image && (
              <div className="mt-4">
                <img
                  src={image}
                  alt="Generated AI visual"
                  className="w-full rounded-lg border"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIImageGenerator;
