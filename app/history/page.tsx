import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { Card } from "@/components/ui/card";

export default async function HistoryPage() {
  const generations = await prisma.generation.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 20,
  });

  return (
    <div className="container max-w-2xl p-4 space-y-4">
      <h1 className="text-2xl font-bold">Generation History</h1>
      
      <div className="grid grid-cols-2 gap-4">
        {generations.map((generation) => (
          <Card key={generation.id} className="overflow-hidden">
            <div className="relative aspect-square">
              <Image
                src={generation.imageUrl}
                alt={generation.prompt}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-2">
              <p className="text-sm text-muted-foreground truncate">
                {generation.prompt}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {generations.length === 0 && (
        <p className="text-center text-muted-foreground">
          No generations yet. Start by creating your first image!
        </p>
      )}
    </div>
  );
}