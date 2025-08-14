// Emoji Rain
const emojis = ["ℙ𝕣𝕒𝕟𝕛𝕒𝕝𝕚","🎂", "🎈", "🍬", "🌟", "🎉", "🍭", "❤️"];
function createEmoji() {
  const emoji = document.createElement("div");
  emoji.classList.add("emoji");
  emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
  emoji.style.left = Math.random() * 100 + "vw";
  emoji.style.animationDuration = Math.random() * 3 + 2 + "s"; // 2-5 sec
  document.body.appendChild(emoji);

  setTimeout(() => emoji.remove(), 5000);
}
setInterval(createEmoji, 300);

// 🎊 Confetti + 🎆 Fireworks
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createParticle(x, y, color) {
  particles.push({
    x, y,
    radius: Math.random() * 4 + 2,
    color,
    dx: (Math.random() - 0.5) * 6,
    dy: (Math.random() - 0.5) * 6,
    life: 100
  });
}

function fireworks() {
  const colors = ["#ff0", "#460186ff", "#00f", "#0f0", "#f0f"];
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height / 2;
  for (let i = 0; i < 50; i++) {
    createParticle(x, y, colors[Math.floor(Math.random() * colors.length)]);
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    p.x += p.dx;
    p.y += p.dy;
    p.life -= 1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
    if (p.life <= 0) particles.splice(i, 1);
  });
  requestAnimationFrame(animate);
}
animate();
setInterval(fireworks, 2000);

// Balloons Floating 🎈
function createBalloon() {
  const balloon = document.createElement("div");
  balloon.innerText = "🎈";
  balloon.style.position = "absolute";
  balloon.style.left = Math.random() * 100 + "vw";
  balloon.style.bottom = "-50px";
  balloon.style.fontSize = "2rem";
  balloon.style.animation = `rise ${5 + Math.random() * 5}s linear`;
  document.body.appendChild(balloon);

  setTimeout(() => balloon.remove(), 10000);
}
setInterval(createBalloon, 2000);

// Balloon rise animation
const style = document.createElement('style');
style.innerHTML = `
@keyframes rise {
  to {
    transform: translateY(-110vh);
    opacity: 0;
  }
}`;
document.head.appendChild(style);

// ================== ROTATING GALLERY ==================
const photoContainer = document.getElementById('photoContainer');
const images = photoContainer.querySelectorAll('img');

const angle = 360 / images.length;
const radius = 400;
let currentRotation = 0;
let scalePulse = 0;

// Arrange images in a circle (XZ plane)
images.forEach((img, i) => {
  const rotation = angle * i;
  img.dataset.rotation = rotation; // store original rotation
});

// Auto rotation + zoom effect
function rotateGallery() {
  currentRotation += 0.5; // speed
  scalePulse += 0.05;     // zoom pulsing

  images.forEach((img, i) => {
    const rotation = parseFloat(img.dataset.rotation) + currentRotation;
    const scale = 1 + Math.sin(scalePulse + i) * 0.2; // zoom in/out

    img.style.transform = `
      rotateY(${rotation}deg)
      translateZ(${radius}px)
      scale(${scale})
    `;
  });

  requestAnimationFrame(rotateGallery);
}
rotateGallery();
