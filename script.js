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

let petalInterval;
let fireflyInterval;

// 4. Falling Petals Effect
function createFallingPetals() {
    const colors = ['#ff1a1a', '#ffcc00', '#ff66a3', '#ff751a', '#9966ff'];
    petalInterval = setInterval(() => {
        if (!bouquetContainer.classList.contains('blooming')) return;
        
        const petal = document.createElement('div');
        petal.className = 'falling-petal animate-fall';
        const startX = Math.random() * 100;
        petal.style.setProperty('--lx', startX + 'vw');
        petal.style.setProperty('--petal-color', colors[Math.floor(Math.random() * colors.length)]);
        petal.style.transform = `scale(${0.5 + Math.random()})`;
        
        document.body.appendChild(petal);
        setTimeout(() => petal.remove(), 5000);
    }, 300);
}

// 5. Butterfly Effect
function spawnButterflies() {
    const colors = ['#ffcc00', '#ff99cc', '#99ffff'];
    for (let i = 0; i < 3; i++) {
        const b = document.createElement('div');
        b.className = 'butterfly';
        b.style.setProperty('--color', colors[i]);
        
        const startX = 150 + Math.random() * 100;
        const startY = 150 + Math.random() * 100;
        b.style.left = startX + 'px';
        b.style.top = startY + 'px';
        
        b.innerHTML = `
            <div class="wing left"></div>
            <div class="wing right"></div>
        `;
        
        bouquetContainer.appendChild(b);
        animateButterfly(b);
    }
}

function animateButterfly(el) {
    let angle = Math.random() * Math.PI * 2;
    function move() {
        if (!bouquetContainer.classList.contains('blooming')) return;
        angle += 0.02;
        const x = Math.sin(angle) * 120 + 200;
        const y = Math.cos(angle * 0.5) * 80 + 150;
        el.style.left = x + 'px';
        el.style.top = y + 'px';
        el.style.transform = `rotate(${Math.sin(angle) * 20}deg)`;
        requestAnimationFrame(move);
    }
    move();
}

// 7. Firefly Effect
function spawnFireflies() {
    fireflyInterval = setInterval(() => {
        if (!bouquetContainer.classList.contains('blooming')) return;
        
        const f = document.createElement('div');
        f.className = 'firefly';
        f.style.left = Math.random() * 100 + 'vw';
        f.style.top = Math.random() * 100 + 'vh';
        
        const dx = (Math.random() - 0.5) * 200 + 'px';
        const dy = (Math.random() - 0.5) * 200 + 'px';
        f.style.setProperty('--dx', dx);
        f.style.setProperty('--dy', dy);
        
        f.style.animation = `fireflyMove ${4 + Math.random() * 4}s ease-in-out forwards`;
        
        document.body.appendChild(f);
        setTimeout(() => f.remove(), 8000);
    }, 400);
}

// 8. Replay Logic
function resetMagic() {
    // Clear Intervals
    clearInterval(petalInterval);
    clearInterval(fireflyInterval);
    
    // Remove dynamic elements
    document.querySelectorAll('.flower-wrapper, .butterfly, .firefly, .falling-petal, .sparkle').forEach(el => el.remove());
    
    // Reset classes and styles
    bouquetContainer.classList.remove('blooming');
    bouquetContainer.style.display = 'none';
    
    const surpriseBtn = document.getElementById('surpriseBtn');
    surpriseBtn.classList.remove('hide');
    
    document.getElementById('replayBtn').classList.remove('show');
}

document.getElementById('replayBtn').addEventListener('click', resetMagic);

// 6. Interactive Parallax Logic
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;
    
    document.documentElement.style.setProperty('--mx', x);
    document.documentElement.style.setProperty('--my', y);
});

// Main Interaction
document.getElementById('surpriseBtn').addEventListener('click', function () {
    this.classList.add('hide');
    
    spawnFlowers();
    
    bouquetContainer.style.display = 'block';
    void bouquetContainer.offsetWidth;
    bouquetContainer.classList.add('blooming');

    // Trigger sound and sparkles when the red flower blooms
    setTimeout(() => {
        playTwinkleSound();
        createSparkles(200, 150);
    }, 2000);

    // Start falling petals, butterflies, and fireflies
    setTimeout(() => {
        createFallingPetals();
        spawnButterflies();
        spawnFireflies();
    }, 2500);
    
    // Show replay button after everything is done
    setTimeout(() => {
        document.getElementById('replayBtn').classList.add('show');
    }, 5000);
});
