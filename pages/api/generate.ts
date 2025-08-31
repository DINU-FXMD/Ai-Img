import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { prompt, aspect, style } = req.body;

  try {
    const result = await client.images.generate({
      model: "gpt-image-1",
      prompt: `${prompt}, style: ${style}`,
      size: aspect,
    });

    res.status(200).json({ url: result.data[0].url });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Image generation failed" });
  }
}
