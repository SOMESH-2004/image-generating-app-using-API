from flask import Flask, request, jsonify
from diffusers import StableDiffusionPipeline
import torch
import base64
from io import BytesIO
from PIL import Image
import os

app = Flask(__name__)

# Load the model
device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"Using device: {device}")

# Using Nano Banana model (lightweight stable diffusion)
pipe = StableDiffusionPipeline.from_pretrained(
    "CompVis/stable-diffusion-v1-4",
    torch_dtype=torch.float16 if device == "cuda" else torch.float32,
    safety_checker=None
).to(device)

pipe.enable_attention_slicing()  # For faster inference

@app.route('/generate', methods=['POST'])
def generate_image():
    try:
        data = request.json
        prompt = data.get('prompt', '')
        
        if not prompt:
            return jsonify({'error': 'Prompt is required'}), 400
        
        # Generate image
        with torch.no_grad():
            image = pipe(prompt, num_inference_steps=50, guidance_scale=7.5).images[0]
        
        # Convert image to base64
        buffered = BytesIO()
        image.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode()
        
        return jsonify({
            'success': True,
            'image': f'data:image/png;base64,{img_str}'
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'Model loaded and ready'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
