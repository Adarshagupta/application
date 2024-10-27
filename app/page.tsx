import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Sparkles, Zap, Image as ImageIcon, History as HistoryIcon, Wand2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const features = [
    {
      icon: <Wand2 className="h-6 w-6" />,
      title: "AI-Powered Creation",
      description: "Transform text into stunning visuals using advanced AI technology",
      href: "/generate",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: <HistoryIcon className="h-6 w-6" />,
      title: "Image History",
      description: "Keep track of all your creative generations",
      href: "/history",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Generation",
      description: "Create beautiful images in seconds",
      href: "/generate",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background z-0" />
        <div className="container max-w-4xl px-4 pt-20 pb-16 relative z-10">
          <div className="text-center space-y-6">
            <div className="inline-block animate-bounce-slow">
              <Sparkles className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
              AI Image Generator
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your imagination into stunning visuals with our state-of-the-art AI technology
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/generate">
                <Button size="lg" className="gap-2">
                  Start Creating
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/history">
                <Button size="lg" variant="outline">
                  View Gallery
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container max-w-4xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="p-6 space-y-4 border-primary/20 bg-gradient-to-br from-background to-primary/5">
            <div className="aspect-square relative rounded-lg overflow-hidden bg-muted">
              <Image
                src="/demo-image.jpg"
                alt="Example generated image"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold">Create Magic</h3>
              <p className="text-muted-foreground">
                Turn your ideas into stunning visuals with just a few words
              </p>
              <Link href="/generate">
                <Button className="w-full gap-2 group">
                  Start Creating
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </Card>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <Link key={index} href={feature.href}>
                <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-background to-primary/5">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl ${feature.bgColor} ${feature.color}`}>
                      {feature.icon}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-medium">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="container max-w-4xl px-4 py-8 text-center border-t">
        <p className="text-sm text-muted-foreground">
          Powered by advanced AI models to create unique and creative images
        </p>
      </div>
    </div>
  );
}
