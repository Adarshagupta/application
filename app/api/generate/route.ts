import { NextResponse } from 'next/server';
import Replicate from 'replicate';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      console.log('No session or user ID:', session);
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { prompt } = await req.json();
    console.log('Received prompt:', prompt);

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    console.log('Calling Replicate API...');
    const output = await replicate.run(
      "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
      {
        input: {
          prompt,
          width: 768,
          height: 768,
          num_outputs: 1,
          num_inference_steps: 50,
          guidance_scale: 7.5,
        }
      }
    );
    console.log('Replicate API response:', output);

    const imageUrl = Array.isArray(output) ? output[0] : output;
    console.log('Image URL:', imageUrl);

    // Create generation with userId from session
    const generation = await prisma.generation.create({
      data: {
        prompt,
        imageUrl,
        userId: session.user.id,
      }
    });
    console.log('Generation saved:', generation);

    return NextResponse.json(generation);
  } catch (error) {
    console.error("[GENERATION_ERROR] Full error:", error);
    if (error instanceof Error) {
      console.error("[GENERATION_ERROR] Message:", error.message);
      console.error("[GENERATION_ERROR] Stack:", error.stack);
    }
    return new NextResponse(`Internal Error: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 500 });
  }
}
