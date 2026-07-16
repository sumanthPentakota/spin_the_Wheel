// =======================
// LOVE WHEEL
// =======================

const options = [
    "💌 5 Wishes",
    "📦 Any One Order to Me",
    "💖 One Day Completely Yours",
    "🌹 One Day Date",
    "👑 Be Like Dominant"
];

const colors = [
    "#ff5c8d",
    "#ff8fab",
    "#ffb3c6",
    "#ffcad4",
    "#ffc2d1"
];

const wheel = document.getElementById("wheel");
const segments = document.getElementById("segments");
const labels = document.getElementById("labels");

const spinBtn = document.getElementById("spinBtn");

const popup = document.getElementById("resultBox");
const winnerText = document.getElementById("winnerText");
const closeBtn = document.getElementById("closePopup");

const radius = 290;
const cx = 300;
const cy = 300;

let currentRotation = 0;
let spinning = false;

const slice = 360 / options.length;

// =======================
// CREATE SVG WHEEL
// =======================

function polar(angle, r) {

    const rad = (angle - 90) * Math.PI / 180;

    return {
        x: cx + r * Math.cos(rad),
        y: cy + r * Math.sin(rad)
    };

}

function createWheel() {

    for (let i = 0; i < options.length; i++) {

        const start = i * slice;
        const end = start + slice;

        const p1 = polar(start, radius);
        const p2 = polar(end, radius);

        const path = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );

        path.setAttribute(
            "d",
            `M ${cx} ${cy}
             L ${p1.x} ${p1.y}
             A ${radius} ${radius} 0 0 1 ${p2.x} ${p2.y}
             Z`
        );

        path.setAttribute("fill", colors[i]);

        segments.appendChild(path);

        // LABEL

        const angle = start + slice / 2;

        const pos = polar(angle, 175);

        const text = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
        );

        text.setAttribute("x", pos.x);
        text.setAttribute("y", pos.y);

        text.setAttribute(
            "transform",
            `rotate(${angle},${pos.x},${pos.y})`
        );

        text.setAttribute("text-anchor", "middle");

        text.setAttribute("font-size", "16");

        text.setAttribute("fill", "white");

        text.textContent = options[i];

        labels.appendChild(text);

    }

}

createWheel();

// =======================
// SPIN
// =======================

spinBtn.addEventListener("click", spin);

function spin() {

    if (spinning) return;

    spinning = true;

    spinBtn.disabled = true;

    const random = Math.floor(Math.random() * 360);

    const total = 360 * 6 + random;

    currentRotation += total;

    wheel.style.transition =
        "transform 6s cubic-bezier(.17,.67,.18,1)";

    wheel.style.transform =
        `rotate(${currentRotation}deg)`;

    setTimeout(() => {

        showWinner();

        spinning = false;

        spinBtn.disabled = false;

    }, 6000);

}

// =======================
// WINNER
// =======================

function showWinner() {

    const normalized =
        ((currentRotation % 360) + 360) % 360;

    const pointerAngle =
        (360 - normalized) % 360;

    const index =
        Math.floor(pointerAngle / slice);

    winnerText.innerHTML =
        options[index];

    popup.classList.add("show");

}

// =======================
// CLOSE
// =======================

closeBtn.addEventListener("click", () => {

    popup.classList.remove("show");

});

// =======================
// FLOATING HEARTS
// =======================

const hearts = document.querySelector(".hearts");

function createHeart() {

    const heart = document.createElement("span");

    heart.className = "heart";

    heart.innerHTML = "❤️";

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.fontSize =
        15 + Math.random() * 25 + "px";

    heart.style.animationDuration =
        6 + Math.random() * 5 + "s";

    hearts.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 11000);

}

setInterval(createHeart, 500);
