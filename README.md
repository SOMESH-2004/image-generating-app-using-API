# Image Generator App - Setup Guide

## Installation

### 1. Install Python Dependencies
```bash
pip install -r requirements.txt
```

**Note:** First-time model download (~4GB) will take time. The model downloads automatically on first run.

### 2. Run the Python Backend
```bash
python AI.py
```

You should see:
```
Using device: cuda (or cpu)
* Running on http://127.0.0.1:5000
```

### 3. Open the Web App
- Open `index.html` in your browser
- Or use a local server: `python -m http.server 8000`

## How It Works

1. **Frontend** (main.js): Sends image descriptions to the backend
2. **Backend** (AI.py): Uses Stable Diffusion model to generate images
3. **Display**: Shows generated image in the browser

## Features

- Real-time image generation
- Supports text descriptions
- Press Enter or click Generate button
- Loading state while generating
- Error handling

## Requirements

- Python 3.8+
- CUDA GPU (optional, but recommended for fast generation)
- 8GB+ RAM
- 4GB+ disk space for model download

## Troubleshooting

- **Connection error**: Make sure `python AI.py` is running
- **CUDA out of memory**: Use CPU mode (model will auto-fall back)
- **Slow generation**: First run downloads the model (~4GB)

## Model Details

- **Model**: Stable Diffusion v1.5
- **Steps**: 50 (affects quality vs speed)
- **Guidance Scale**: 7.5 (affects prompt following)
