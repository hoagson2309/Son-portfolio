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



// // Reactive wave background
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