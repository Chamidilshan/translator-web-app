import { HfInference } from "@huggingface/inference";

const HF_ACCESS_TOKEN = process.env.HF_ACCESS_TOKEN;

const inference = new HfInference(HF_ACCESS_TOKEN);

export default async function handler(req, res) {
  const { text, lang } = req.body;

  const languageModels = {
    "en-es": "Helsinki-NLP/opus-mt-en-es",
    "ec-de": "Helsinki-NLP/opus-mt-en-de",
    "en-fr": "Helsinki-NLP/opus-mt-en-fr",
  }

  const response = await inference.translation({
    model: languageModels[lang],
    inputs: text,
  });

  console.log(response);
  console.log(response.status_code);
  res.status(200).json({
    translated_text: response.translation_text,
  }); 
  
}

