document.addEventListener("DOMContentLoaded", () => {
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.pageX;
        mouseY = e.pageY;

        createParticles();
    });

    function createParticles() {
        const particleCount = 1;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("div");
            particle.className = "particle";

            const pinkShade = Math.floor(Math.random() * 55) + 200;
            const pinkShade2 = Math.floor(Math.random() * 100) + 100;
            particle.style.backgroundColor = `rgb(${pinkShade}, ${pinkShade2}, ${pinkShade})`;

            const size = Math.random() * 2 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            const offsetX = (Math.random() - 0.5) * 20;
            const offsetY = (Math.random() - 0.5) * 20;
            particle.style.left = `${mouseX + offsetX}px`;
            particle.style.top = `${mouseY + offsetY}px`;

            document.body.appendChild(particle);

            animateParticle(particle);
        }
    }

    function animateParticle(particle) {
        let posY = parseFloat(particle.style.top);
        let opacity = 1;
        let rotation = 0;
        const fallSpeed = Math.random() * 3 + 2;
        const rotationSpeed = (Math.random() - 0.5) * 10;

        const animation = setInterval(() => {
            posY += fallSpeed;
            opacity -= 0.01;
            rotation += rotationSpeed;

            particle.style.top = `${posY}px`;
            particle.style.opacity = opacity;
            particle.style.transform = `rotate(${rotation}deg)`;

            if (opacity <= 0) {
                clearInterval(animation);
                particle.remove();
            }
        }, 16);
    }
});
