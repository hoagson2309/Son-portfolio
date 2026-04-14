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