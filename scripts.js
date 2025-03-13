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

  function updateUserCount() {
    let count = parseInt(userCountElement.textContent.replace(/,/g, ""));
    const change = Math.floor(Math.random() * 11) - 5; // Random change between -5 and +5
    count = Math.max(90, Math.min(200, count + change)); // Keep count between 90 and 200
    userCountElement.textContent = count.toLocaleString();
    console.log("Updated user count to:", count); // Debug log
  }

  // Initial update to ensure the function runs at least once
  updateUserCount();

  // Update every 10 seconds
  setInterval(updateUserCount, 10000);
};
