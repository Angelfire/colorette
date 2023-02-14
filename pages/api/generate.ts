import type { NextApiRequest, NextApiResponse } from "next"
import {Configuration, OpenAIApi} from "openai"

// type Data = {
//   name: string
// }

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing Environment Variable OPENAI_API_KEY")
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration)

const basePrompt = 'Generates a palette of maximum 5 colors, give me the results in an object containing an array of objects for each color, each object should have: the hexadecimals of each color, the names, the pantone names, the rgb, also include a title on the object for the palette and a description, the response must be a valid JSON object, use the following keywords:'

export default async function handler(
  req: NextApiRequest,
  // res: NextApiResponse<Data>
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const { prompt } = req.body

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePrompt} ${prompt}\n`,
    temperature: 0.7,
    max_tokens: 512
  })

  const parsedData = response.data.choices[0].text || ''
  const palette = JSON.parse(parsedData)

  res.status(200).json(palette)
}
