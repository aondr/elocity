function animateScrollingText() {
    const container = document.querySelector(".scrolling-text-container");
    const textElement = document.querySelector(".scrolling-text");

    textElement.style.left = container.offsetWidth + "px";

    const textWidth = textElement.offsetWidth;

    const duration = (container.offsetWidth + textWidth) * 10;

    function animate() {
        const currentLeft = parseInt(textElement.style.left);
        if (currentLeft < -textWidth) {
            textElement.style.left = container.offsetWidth + "px";
        } else {
            textElement.style.left = currentLeft - 1 + "px";
        }

        requestAnimationFrame(animate);
    }

    animate();
}

// window.addEventListener("DOMContentLoaded", animateScrollingText);
