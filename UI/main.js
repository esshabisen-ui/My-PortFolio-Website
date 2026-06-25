// ================= TYPING ANIMATION =================
const roles = [
    "Aspiring Data Analyst",
    "SQL Enthusiast",
    "Power BI Developer",
    "Python Learner"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const typingText = document.getElementById("typing-text");
    if (!typingText) return;

    const currentRole = roles[roleIndex];

    if (!isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1500); // Poora word likhne ke baad ka pause
            return;
        }
    } else {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length; // Array loop automatic reset
        }
    }

    setTimeout(typeEffect, isDeleting ? 40 : 80); // Smooth typing speeds
}

// Dom content load hote hi typing shuru
document.addEventListener("DOMContentLoaded", typeEffect);


// ================= SMOOTH SCROLL =================
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


// ================= ACTIVE NAVBAR ON SCROLL =================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {
    let current = "";
    const scrollPosition = window.scrollY + 160; // Offset alignment

    sections.forEach(section => {
        if (scrollPosition >= section.offsetTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});


// ================= SMART CIRCLE LOADING ANIMATION =================
const skillsSection = document.querySelector('#skills');
const circles = document.querySelectorAll(".outer");

const animateCircles = () => {
    circles.forEach(circle => {
        const percent = parseInt(circle.getAttribute("data-percent")) || 0;
        let degree = 0;
        const targetDegree = percent * 3.6;

        const interval = setInterval(() => {
            degree += 5; // Loading speed scaling

            if (degree >= targetDegree) {
                degree = targetDegree;
                clearInterval(interval);
            }

            circle.style.background = `conic-gradient(
                #00abf0 ${degree}deg,
                #112e42 ${degree}deg
            )`;
        }, 15);
    });
};
if (skillsSection && circles.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCircles(); 
                observer.unobserve(skillsSection); 
            }
        });
    }, { threshold: 0.25 }); 

    observer.observe(skillsSection);
}

