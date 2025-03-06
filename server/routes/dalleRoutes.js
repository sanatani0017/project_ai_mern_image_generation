import express from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Function to generate the image URL using Pollinations API
function generateImageUrl(prompt, width = 1536, height = 1536) {
  try {
    // Using Pollinations.ai API
    return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}&noCache=${Date.now()}`;
  } catch (error) {
    console.error("❌ Error Generating Image URL:", error.message);
    return null;
  }
}

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from the image generation API!' });
});

router.route('/').post((req, res) => {
  try {
    const { prompt } = req.body;
    
    // Generate the image URL based on the provided prompt
    const imageUrl = generateImageUrl(prompt);

    if (imageUrl) {
      res.status(200).json({ photo: imageUrl });
    } else {
      res.status(500).send('Error generating image');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error?.message || 'Something went wrong');
  }
});

export default router;
