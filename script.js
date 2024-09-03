// Smooth fade-in effect
document.addEventListener("DOMContentLoaded", function() {
    const screen = document.querySelector('.screen');
    screen.classList.add('show');
});

// Redirecting back to index.html
function goBack() {
    window.location.href = "index.html";
}

// Adding sway animation to bubbles
document.querySelectorAll('.bubble').forEach(bubble => {
    bubble.addEventListener('click', function() {
        bubble.classList.add('sway');
        setTimeout(() => {
            bubble.classList.remove('sway');
        }, 1000);

        // Optional: Redirect after animation
        setTimeout(() => {
            if (bubble.id === 'adhd-bubble') {
                window.location.href = "adhd.html";
            } else if (bubble.id === 'autism-bubble') {
                window.location.href = "autism.html";
            }
        }, 1000);
    });
});
window.addEventListener("beforeunload", function () {
    document.body.classList.add("fade-out");
});


