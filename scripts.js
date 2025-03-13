document.addEventListener("DOMContentLoaded", () => {
  // Device Detection for Optimization
  const isMobile = window.innerWidth <= 768;
  const nodeCount = isMobile ? 30 : 50; // Fewer nodes on mobile
  const streamColumns = isMobile ? 4 : 8; // Fewer streams on mobile

  // Neural Network Visualization
  function createNeuralNetwork(nodes) {
    const neuralNetwork = document.getElementById("neural-network");
    const nodeElements = [];

    // Create nodes
    for (let i = 0; i < nodes; i++) {
      const node = document.createElement("div");
      node.className = "neural-node";
      node.style.left = Math.random() * 100 + "vw";
      node.style.top = Math.random() * 100 + "vh";
      neuralNetwork.appendChild(node);
      nodeElements.push(node);
    }

    // Create connections (skip more on mobile for performance)
    for (let i = 0; i < nodeElements.length; i++) {
      for (let j = i + 1; j < nodeElements.length; j++) {
        if (Math.random() > (isMobile ? 0.8 : 0.7)) continue; // Skip more connections on mobile
        const nodeA = nodeElements[i];
        const nodeB = nodeElements[j];
        const connection = document.createElement("div");
        connection.className = "neural-connection";
        const posA = { x: parseFloat(nodeA.style.left), y: parseFloat(nodeA.style.top) };
        const posB = { x: parseFloat(nodeB.style.left), y: parseFloat(nodeB.style.top) };
        const length = Math.sqrt(Math.pow(posB.x - posA.x, 2) + Math.pow(posB.y - posA.y, 2));
        const angle = Math.atan2(posB.y - posA.y, posB.x - posA.x) * 180 / Math.PI;
        connection.style.width = length + "vw";
        connection.style.transform = `rotate(${angle}deg)`;
        connection.style.left = posA.x + "vw";
        connection.style.top = posA.y + "vh";
        neuralNetwork.appendChild(connection);
      }
    }
  }
  createNeuralNetwork(nodeCount);

  // Gentle Node Movement (disable on mobile for performance)
  function animateNodes() {
    if (isMobile) return; // Skip animation on mobile
    const nodes = document.querySelectorAll(".neural-node");
    nodes.forEach(node => {
      gsap.to(node, {
        x: Math.random() * 20 - 10 + "px",
        y: Math.random() * 20 - 10 + "px",
        duration: 10 + Math.random() * 10,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    });
  }
  animateNodes();

  // Scroll Animations
  gsap.from(".hero", {
    opacity: 0,
    duration: 2,
    ease: "power3.inOut"
  });

  gsap.from(".module", {
    opacity: 0,
    y: 30,
    duration: 1,
    stagger: 0.3,
    scrollTrigger: {
      trigger: "#features",
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  });

  gsap.from(".testimonial", {
    opacity: 0,
    y: 30,
    duration: 1,
    stagger: 0.3,
    scrollTrigger: {
      trigger: "#testimonials",
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  });

  // Reactive Neural Pulse
  function triggerNeuralPulse() {
    const neuralNetwork = document.getElementById("neural-network");
    neuralNetwork.classList.remove("pulse-active");
    void neuralNetwork.offsetWidth; // Reset animation
    neuralNetwork.classList.add("pulse-active");

    // Play subtle pulse audio (disable on mobile)
    if (!isMobile) {
      const pulseAudio = document.getElementById("pulse-audio");
      pulseAudio.currentTime = 0;
      pulseAudio.volume = 0.2;
      pulseAudio.play().catch(error => console.log("Audio play failed:", error));
    }
  }

  // Throttle function to limit event frequency
  function throttle(fn, wait) {
    let lastTime = 0;
    return function (...args) {
      const now = Date.now();
      if (now - lastTime >= wait) {
        fn(...args);
        lastTime = now;
      }
    };
  }

  // Trigger pulse on scroll (throttled)
  window.addEventListener("scroll", throttle(triggerNeuralPulse, 500));

  // Trigger pulse on hover over interactive elements
  const interactiveElements = document.querySelectorAll(".module, .testimonial, .cta-btn");
  interactiveElements.forEach(element => {
    element.addEventListener("mouseover", throttle(triggerNeuralPulse, 500));
  });

  // Dynamic Data Stream Generation
  function createDataStream(columns) {
    const dataStream = document.getElementById("data-stream");
    const chars = "01ABCDEFabcdef!@#$%^&*()";
    for (let i = 0; i < columns; i++) {
      const column = document.createElement("div");
      column.className = "data-column";
      column.style.left = (i * (100 / columns)) + "%";
      column.style.width = (100 / columns) + "%";
      let text = "";
      for (let j = 0; j < 50; j++) {
        text += chars[Math.floor(Math.random() * chars.length)] + "<br>";
      }
      column.innerHTML = text;
      dataStream.appendChild(column);
    }
  }
  createDataStream(streamColumns);

  // React to User Interaction (throttled)
  function activateDataStream() {
    const columns = document.querySelectorAll(".data-column");
    columns.forEach(column => {
      column.classList.add("active");
      setTimeout(() => column.classList.remove("active"), 5000);
    });
  }

  // Trigger on scroll and click (throttled)
  window.addEventListener("scroll", throttle(activateDataStream, 500));
  window.addEventListener("click", throttle(activateDataStream, 500));
});

// 🔹 Holographic Hover Effect with 3D Tilt
const tiltElements = document.querySelectorAll(".module, .testimonial, .cta-btn");
tiltElements.forEach(element => {
  element.addEventListener("mousemove", (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / centerY * 5;
    const rotateY = (centerX - x) / centerX * 5;
    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  element.addEventListener("mouseleave", () => {
    element.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  });
});

// 🔹 Request Access Modal Logic
const buyButtons = document.querySelectorAll(".buy-btn");
const modal = document.getElementById("request-modal");
const closeModal = document.getElementById("close-modal");
const tierInput = document.getElementById("tier-input");
const requestForm = document.getElementById("request-form");
const successMessage = document.getElementById("success-message");
const errorMessage = document.getElementById("error-message");

buyButtons.forEach(button => {
  button.addEventListener("click", () => {
    const tier = button.getAttribute("data-tier");
    tierInput.value = tier.charAt(0).toUpperCase() + tier.slice(1);
    modal.style.display = "flex";
    requestForm.style.display = "block";
    successMessage.style.display = "none";
    errorMessage.style.display = "none";
  });
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Handle form submission with Formspree
requestForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(requestForm);

  fetch(requestForm.action, {
    method: "POST",
    body: formData,
    headers: {
      "Accept": "application/json"
    }
  })
  .then(response => {
    if (response.ok) {
      requestForm.style.display = "none";
      successMessage.style.display = "block";
      requestForm.reset();
      console.log("Form submitted successfully");
      return response.json();
    } else {
      return response.json().then(data => {
        throw new Error(`Submission failed: ${data.error || response.statusText}`);
      });
    }
  })
  .then(data => {
    console.log("Response data:", data);
  })
  .catch(error => {
    requestForm.style.display = "none";
    errorMessage.style.display = "block";
    console.error("Error:", error.message);
  });
});

// 🔹 Simulated Users Online Counter (90-200 Range)
window.onload = function() {
  const userCountElement = document.getElementById("user-count");
  if (!userCountElement) {
    console.error("Error: Could not find element with ID 'user-count'");
    return;
  }

// 🔹 Cybernetic Particle System
function createParticleSystem() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) {
    console.error('Canvas element not found!');
    return;
  }
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('Canvas context not available!');
    return;
  }
  console.log('Canvas and context found, initializing particles...');

  let particles = [];
  const particleCount = 100;

  // Set canvas size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  console.log('Canvas size set to:', canvas.width, 'x', canvas.height);

  // Resize canvas on window resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log('Resized canvas to:', canvas.width, 'x', canvas.height);
  });

  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 5 + 1;
      this.speedX = Math.random() * 2 - 1;
      this.speedY = Math.random() * 2 - 1;
      this.glow = Math.random() * 10 + 5;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        this.speedX += dx * 0.001;
        this.speedY += dy * 0.001;
        this.glow = 20;
      } else {
        this.glow = Math.max(5, this.glow - 0.1);
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 255, 204, 0.8)`;
      ctx.shadowBlur = this.glow;
      ctx.shadowColor = '#00ffcc';
      ctx.fill();
    }
  }

  let mouseX = 0;
  let mouseY = 0;
  canvas.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
  console.log('Particle system started with', particleCount, 'particles');
}

// 🔹 Window Load Handler
window.onload = function() {
  // Neural Network Animation
  function createNeuralNetwork() {
    const network = document.getElementById('neural-network');
    network.innerHTML = '';

    for (let i = 0; i < 20; i++) {
      const line = document.createElement('div');
      line.className = 'neural-line';
      line.style.left = `${Math.random() * 100}vw`;
      line.style.animationDuration = `${Math.random() * 3 + 2}s`;
      network.appendChild(line);
    }

    gsap.fromTo('.neural-line', 
      { y: '-100%', opacity: 0.5 },
      { 
        y: '100vh', 
        opacity: 0, 
        ease: 'linear',
        stagger: 0.1,
        repeat: -1,
        duration: 3
      }
    );
  }

  createNeuralNetwork();
  setInterval(createNeuralNetwork, 5000);

  // Request Access Modal Logic
  const buyButtons = document.querySelectorAll(".buy-btn, .try-btn");
  const modal = document.getElementById("request-modal");
  const closeModal = document.getElementById("close-modal");
  const tierInput = document.getElementById("tier-input");
  const requestForm = document.getElementById("request-form");
  const successMessage = document.getElementById("success-message");
  const errorMessage = document.getElementById("error-message");

  buyButtons.forEach(button => {
    button.addEventListener("click", () => {
      const tier = button.getAttribute("data-tier");
      tierInput.value = tier.charAt(0).toUpperCase() + tier.slice(1);
      modal.style.display = "flex";
      requestForm.style.display = "block";
      successMessage.style.display = "none";
      errorMessage.style.display = "none";
    });
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  requestForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(requestForm);

    fetch(requestForm.action, {
      method: "POST",
      body: formData,
      headers: {
        "Accept": "application/json"
      }
    })
    .then(response => {
      if (response.ok) {
        requestForm.style.display = "none";
        successMessage.style.display = "block";
        requestForm.reset();
        console.log("Form submitted successfully");
        return response.json();
      } else {
        return response.json().then(data => {
          throw new Error(`Submission failed: ${data.error || response.statusText}`);
        });
      }
    })
    .then(data => {
      console.log("Response data:", data);
    })
    .catch(error => {
      requestForm.style.display = "none";
      errorMessage.style.display = "block";
      console.error("Error:", error.message");
    });
  });

  const userCountElement = document.getElementById("user-count");
  if (!userCountElement) {
    console.error("Error: Could not find element with ID 'user-count'");
    return;
  }

  function updateUserCount() {
    let count = parseInt(userCountElement.textContent.replace(/,/g, ""));
    const change = Math.floor(Math.random() * 21) - 10;
    let newCount = count + change;
    if (Math.abs(change) > 5) {
      newCount = count + (change > 0 ? 5 : -5);
    }
    newCount = Math.max(0, Math.min(200, newCount));
    userCountElement.textContent = newCount.toLocaleString();
    console.log("Updated user count to:", newCount);
  }

  userCountElement.textContent = Math.floor(Math.random() * 201);
  updateUserCount();
  setInterval(updateUserCount, 5000);

  // Start the particle system
  createParticleSystem();
};

// 🔹 Cybernetic Particle System
function createParticleSystem() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) {
    console.error('Canvas element not found!');
    return;
  }
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('Canvas context not available!');
    return;
  }
  console.log('Canvas and context initialized successfully');

  // Set canvas size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1; // Smaller particles for subtlety
      this.speedX = Math.random() * 1 - 0.5; // Slower movement
      this.speedY = Math.random() * 1 - 0.5;
      this.life = Math.random() * 200 + 100; // Particle lifespan
      this.opacity = 0.8;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life -= 1;
      if (this.life <= 0) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.life = Math.random() * 200 + 100;
      }
      // Mouse interaction
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        this.opacity = 0.3; // Dim when near mouse
      } else {
        this.opacity = 0.8;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 255, 204, ${this.opacity})`; // Neon cyan with variable opacity
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(0, 255, 204, 0.5)';
      ctx.fill();
    }
  }

  const particles = [];
  const particleCount = 150;
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  const mouse = { x: 0, y: 0 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
  console.log('Particle system started with', particleCount, 'particles');
}
