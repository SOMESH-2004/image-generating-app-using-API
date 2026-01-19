const textInput = document.getElementById('text-input');
const generateBtn = document.getElementById('generate-btn');
const screen = document.getElementById('screen');

generateBtn.addEventListener('click', generateImage);
textInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') generateImage();
});

async function generateImage() {
    const prompt = textInput.value.trim();
    
    if (!prompt) {
        alert('Please enter a description');
        return;
    }
    
    // Show loading state
    screen.innerHTML = '<p>Generating image... This may take 10-30 seconds</p>';
    generateBtn.disabled = true;
    
    try {
        // Using Pollinations.ai - Free API with CORS enabled, no authentication needed
        const encodedPrompt = encodeURIComponent(prompt);
        const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}`;
        
        // Verify image loads before displaying
        const img = document.createElement('img');
        img.onload = () => {
            screen.innerHTML = '';
            screen.appendChild(img);
        };
        img.onerror = () => {
            screen.innerHTML = '<p>Error loading image. Please try again.</p>';
        };
        img.src = imageUrl;
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';
        img.style.borderRadius = '8px';
        
    } catch (error) {
        screen.innerHTML = `<p>Error generating image: ${error.message}</p>`;
        console.error('Error:', error);
    } finally {
        generateBtn.disabled = false;
    }
}
