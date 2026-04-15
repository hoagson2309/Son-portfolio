function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open")
    icon.classList.toggle("open")
}

// for revealing
function revealOnScroll() {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(el => observer.observe(el));
}

window.addEventListener("DOMContentLoaded", revealOnScroll);


const sections = document.querySelectorAll("section");

let ticking = false;

function handleScroll() {
    const viewportCenter = window.innerHeight / 2;

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;

        const distance = viewportCenter - sectionCenter;

        const maxDistance = window.innerHeight / 4;
        let progress = distance / maxDistance;

        // clamp
        progress = Math.max(-1, Math.min(1, progress));

        // smooth easing
        const eased = 1 - Math.abs(progress) * 0.8; // faster response

        // clean effects (no blur)
        const opacity = 0.6 + eased * 0.4;  // less fade = quicker clarity
        const scale = 0.98 + eased * 0.02;  // smaller movement = snappier

        section.style.opacity = opacity;
        section.style.transform = `scale(${scale})`;
    });

    ticking = false;
}

window.addEventListener("scroll", () => {
    if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
    }
});

window.addEventListener("load", handleScroll);



/////////  REACTIVE MOUSE WAVE BACKGROUND
// const canvas = document.getElementById("bg-canvas");
// const ctx = canvas.getContext("2d");

// let width, height;

// function resize() {
//     width = canvas.width = window.innerWidth;
//     height = canvas.height = window.innerHeight;
// }
// window.addEventListener("resize", resize);
// resize();

// class Wave {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//         this.radius = 0;
//         this.alpha = 1;
//     }

//     update() {
//         this.radius += 2.5;   // speed (higher = faster wave)
//         this.alpha -= 0.015;  // fade speed
//     }

//     draw() {
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
//         ctx.strokeStyle = `rgba(0,0,0,${this.alpha})`; // wave color
//         ctx.lineWidth = 2;
//         ctx.stroke();
//     }
// }

// const waves = [];

// function animate() {
//     ctx.clearRect(0, 0, width, height);

//     for (let i = 0; i < waves.length; i++) {
//         const w = waves[i];
//         w.update();
//         w.draw();
//     }

//     // remove faded waves
//     for (let i = waves.length - 1; i >= 0; i--) {
//         if (waves[i].alpha <= 0) {
//             waves.splice(i, 1);
//         }
//     }

//     requestAnimationFrame(animate);
// }

// animate();

// // mouse waves
// window.addEventListener("mousemove", (e) => {
//     waves.push(new Wave(e.clientX, e.clientY));
// });

// // touch waves (mobile)
// window.addEventListener("touchmove", (e) => {
//     const touch = e.touches[0];
//     waves.push(new Wave(touch.clientX, touch.clientY));
// });



/////// REACTIVE WAVY LINE BACKGROUND
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

let w, h;

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// mouse
const mouse = { x: w / 2, y: h / 2 };

window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

let time = 0;

// ONLY 3 LINES
const lines = 3;

function draw() {
    ctx.clearRect(0, 0, w, h);

    time += 0.01;

    for (let i = 0; i < lines; i++) {

        const baseY = (h / (lines + 1)) * (i + 1);

        ctx.beginPath();

        for (let x = 0; x < w; x += 10) {

            // smooth wave
            let y =
                baseY +
                Math.sin(x * 0.01 + time + i) * 35;

            // mouse distortion (soft pull)
            const dist = Math.hypot(mouse.x - x, mouse.y - y);
            const force = Math.max(0, 1 - dist / 200);

            y += (y - mouse.y) * force * 0.35;

            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }

        ctx.strokeStyle = "rgba(0, 0, 0, 0.08)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
    }

    requestAnimationFrame(draw);
}

draw();



/////////// DOT TERRAIN
// const canvas = document.getElementById("bg-canvas");
// const ctx = canvas.getContext("2d");

// let w, h;

// function resize() {
//     w = canvas.width = window.innerWidth;
//     h = canvas.height = window.innerHeight;
// }
// window.addEventListener("resize", resize);
// resize();

// // mouse
// const mouse = { x: w / 2, y: h / 2 };

// window.addEventListener("mousemove", (e) => {
//     mouse.x = e.clientX;
//     mouse.y = e.clientY;
// });

// // grid settings (IMPORTANT)
// const gap = 18;        // spacing between dots
// const size = 1.5;      // dot size

// let time = 0;

// function draw() {
//     ctx.clearRect(0, 0, w, h);
//     time += 0.01;

//     for (let y = 0; y < h; y += gap) {
//         for (let x = 0; x < w; x += gap) {

//             // base wave height
//             let z = Math.sin(x * 0.02 + time) * 10 +
//                     Math.cos(y * 0.02 + time) * 10;

//             // mouse distortion (pull effect)
//             const dx = x - mouse.x;
//             const dy = y - mouse.y;
//             const dist = Math.sqrt(dx * dx + dy * dy);

//             const force = Math.max(0, 1 - dist / 200);

//             let mx = x + dx * force * 0.2;
//             let my = y + dy * force * 0.2;

//             // dot brightness based on height
//             let brightness = 40 + z * 2;

//             ctx.beginPath();
//             ctx.arc(mx, my + z, size, 0, Math.PI * 2);

//             ctx.fillStyle = `rgba(0,0,0,${0.15 + force * 0.2})`;
//             ctx.fill();
//         }
//     }

//     requestAnimationFrame(draw);
// }

// draw();


///////// REACTIVE INK FOG FIELD
// const canvas = document.getElementById("bg-canvas");
// const ctx = canvas.getContext("2d");

// let w, h;

// function resize() {
//     w = canvas.width = window.innerWidth;
//     h = canvas.height = window.innerHeight;
// }
// window.addEventListener("resize", resize);
// resize();

// // mouse
// const mouse = { x: w / 2, y: h / 2 };

// window.addEventListener("mousemove", (e) => {
//     mouse.x = e.clientX;
//     mouse.y = e.clientY;
// });

// // particles
// const particles = [];
// const COUNT = 120;

// function createParticle() {
//     return {
//         x: Math.random() * w,
//         y: Math.random() * h,
//         vx: (Math.random() - 0.5) * 0.3,
//         vy: (Math.random() - 0.5) * 0.3,
//         r: Math.random() * 2 + 1
//     };
// }

// for (let i = 0; i < COUNT; i++) {
//     particles.push(createParticle());
// }

// function animate() {
//     ctx.clearRect(0, 0, w, h);

//     for (let p of particles) {

//         // mouse force
//         let dx = mouse.x - p.x;
//         let dy = mouse.y - p.y;
//         let dist = Math.sqrt(dx * dx + dy * dy);

//         let force = Math.max(0, 1 - dist / 250);

//         // attraction (soft pull)
//         p.x += p.vx + dx * force * 0.02;
//         p.y += p.vy + dy * force * 0.02;

//         // drift
//         p.vx *= 0.99;
//         p.vy *= 0.99;

//         // draw
//         ctx.beginPath();
//         ctx.fillStyle = `rgba(60,60,60,${0.15 + force * 0.25})`;
//         ctx.arc(p.x, p.y, p.r + force * 2, 0, Math.PI * 2);
//         ctx.fill();
//     }

//     requestAnimationFrame(animate);
// }

// animate();

const buttons = document.querySelectorAll(".btn");

buttons.forEach(btn => {
    let rafId = null;

    btn.addEventListener("mousemove", (e) => {
        if (rafId) cancelAnimationFrame(rafId);

        rafId = requestAnimationFrame(() => {
            const rect = btn.getBoundingClientRect();

            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
        });
    });

    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0, 0)";
    });
});
