// Configuration for the flowers
const flowerData = [
    { left: '80px', top: '100px', size: '85px', delay: '0.8s', core: '#cc6600', petal: '#ffcc00' },
    { left: '320px', top: '125px', size: '90px', delay: '1.0s', core: '#99004d', petal: '#ff66a3' },
    { left: '100px', top: '300px', size: '95px', delay: '1.2s', core: '#992600', petal: '#ff751a' },
    { left: '300px', top: '275px', size: '80px', delay: '0.9s', core: '#330066', petal: '#9966ff' },
    { left: '200px', top: '150px', size: '140px', delay: '2.0s', core: '#660000', petal: '#ff1a1a', isHighlight: true },
    // New flowers
    { left: '150px', top: '220px', size: '75px', delay: '1.4s', core: '#663300', petal: '#ff99cc' },
    { left: '250px', top: '180px', size: '80px', delay: '1.6s', core: '#4d004d', petal: '#ffccff' },
    { left: '130px', top: '150px', size: '70px', delay: '1.1s', core: '#994d00', petal: '#ffb366' },
    { left: '270px', top: '320px', size: '85px', delay: '1.3s', core: '#4d4d00', petal: '#ffff99' }
];

const bouquetContainer = document.getElementById('bouquet-container');

// 1. Function to spawn flowers dynamically
function spawnFlowers() {
    flowerData.forEach(data => {
        const wrapper = document.createElement('div');
        wrapper.className = 'flower-wrapper' + (data.isHighlight ? ' red-highlight' : '');
        wrapper.style.left = data.left;
        wrapper.style.top = data.top;
        wrapper.style.width = data.size;
        wrapper.style.height = data.size;
        wrapper.style.setProperty('--delay', data.delay);

        wrapper.innerHTML = `
            <svg viewBox="-75 -75 150 150" style="--core: ${data.core}; --petal: ${data.petal}; width:100%; height:100%;">
                <use href="#hibiscus-flower" />
            </svg>
        `;
        bouquetContainer.appendChild(wrapper);
    });
}

// 2. Sound synthesis using Web Audio API (Twinkle sound)
function playTwinkleSound() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    
    notes.forEach((freq, i) => {
        setTimeout(() => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start();
            osc.stop(ctx.currentTime + 0.5);
        }, i * 150);
    });
}

// 3. Sparkle Effect
function createSparkles(x, y) {
    for (let i = 0; i < 15; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle animate-sparkle';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        
        // Random trajectory
        const tx = (Math.random() - 0.5) * 150;
        const ty = (Math.random() - 0.5) * 150;
        sparkle.style.setProperty('--tx', `${tx}px`);
        sparkle.style.setProperty('--ty', `${ty}px`);
        sparkle.style.animationDelay = (Math.random() * 0.5) + 's';
        
        bouquetContainer.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 2000);
    }
}

// 4. Falling Petals Effect
function createFallingPetals() {
    const colors = ['#ff1a1a', '#ffcc00', '#ff66a3', '#ff751a', '#9966ff'];
    setInterval(() => {
        if (!bouquetContainer.classList.contains('blooming')) return;
        
        const petal = document.createElement('div');
        petal.className = 'falling-petal animate-fall';
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.setProperty('--petal-color', colors[Math.floor(Math.random() * colors.length)]);
        petal.style.transform = `scale(${0.5 + Math.random()})`;
        
        document.body.appendChild(petal);
        setTimeout(() => petal.remove(), 5000);
    }, 300);
}

// Main Interaction
document.getElementById('surpriseBtn').addEventListener('click', function () {
    this.classList.add('hide');
    
    spawnFlowers();
    
    bouquetContainer.style.display = 'block';
    void bouquetContainer.offsetWidth;
    bouquetContainer.classList.add('blooming');

    // Trigger sound and sparkles when the red flower blooms (approx 2s delay)
    setTimeout(() => {
        playTwinkleSound();
        createSparkles(200, 150); // Position of the red highlight flower
    }, 2000);

    // Start falling petals
    setTimeout(createFallingPetals, 2500);
});
