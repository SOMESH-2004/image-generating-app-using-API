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
    screen.innerHTML = '<p>Generating image...</p>';
    generateBtn.disabled = true;
    
    try {
        const response = await fetch('http://localhost:5000/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: prompt })
        });
        
        const data = await response.json();
        
        if (data.success) {
            const img = document.createElement('img');
            img.src = data.image;
            img.style.maxWidth = '100%';
            img.style.maxHeight = '100%';
            img.style.borderRadius = '8px';
            screen.innerHTML = '';
            screen.appendChild(img);
        } else {
            screen.innerHTML = `<p>Error: ${data.error}</p>`;
        }
    } catch (error) {
        screen.innerHTML = `<p>Connection error. Make sure the Python server is running.</p>`;
        console.error('Error:', error);
    } finally {
        generateBtn.disabled = false;
    }
}
