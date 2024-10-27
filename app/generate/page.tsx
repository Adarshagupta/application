"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, Download, Share2, Wand2, Sparkles } from "lucide-react";
import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [steps, setSteps] = useState(4);
  const [style, setStyle] = useState("realistic");
  const { toast } = useToast();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          prompt,
          num_inference_steps: steps,
          style,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const data = await response.json();
      setImageUrl(data.imageUrl);
      toast({
        title: "Image generated successfully!",
        description: "Your image is ready to view and download.",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate image. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (imageUrl) {
      try {
        await navigator.share({
          title: 'Generated Image',
          text: prompt,
          url: imageUrl,
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to share image.",
        });
      }
    }
  };

  const handleDownload = async () => {
    if (imageUrl) {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `generated-image-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  };

  return (
    <div className="container max-w-2xl p-4 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          Create Magic
        </h1>
      </motion.div>
      
      <Card className="p-6 space-y-6">
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="space-y-2">
            <Label htmlFor="prompt">What would you like to create?</Label>
            <Input
              id="prompt"
              placeholder="A magical forest at sunset..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={loading}
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label>Art Style</Label>
            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realistic">Photorealistic</SelectItem>
                <SelectItem value="anime">Anime</SelectItem>
                <SelectItem value="artistic">Digital Art</SelectItem>
                <SelectItem value="fantasy">Fantasy</SelectItem>
                <SelectItem value="abstract">Abstract</SelectItem>
                <SelectItem value="cyberpunk">Cyberpunk</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Quality Level ({steps})</Label>
            <Slider
              value={[steps]}
              onValueChange={(value) => setSteps(value[0])}
              min={1}
              max={20}
              step={1}
              className="py-4"
            />
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button 
              type="submit" 
              disabled={loading || !prompt} 
              className="w-full h-12 text-lg"
            >
              {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              {loading ? "Creating..." : (
                <>
                  <Wand2 className="mr-2 h-5 w-5" />
                  Create
                </>
              )}
            </Button>
          </motion.div>
        </motion.form>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-center"
          >
            {error}
          </motion.p>
        )}

        {imageUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <Card className="overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src={imageUrl}
                  alt={prompt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-4 flex justify-center space-x-4">
                <Button variant="outline" size="icon" onClick={handleDownload}>
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </Card>
    </div>
  );
}
