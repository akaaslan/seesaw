const bar = document.getElementById('bar');
const reset = document.getElementById('reset-button');
let weights = [];

let nextMass= Math.floor(Math.random() * 10) + 1;

let angleCurrent = 0;
let angleTarget = 0;
const leftWeightSpan = document.getElementById("left-weight")
const rightWeightSpan = document.getElementById("right-weight")
const angleSpan = document.getElementById("angle")

const weightPreview = document.createElement("div");
weightPreview.classList.add("weight-preview");
bar.appendChild(weightPreview);

bar.addEventListener('click', handleBarClick);
reset.addEventListener('click', resetSeesaw);


function handleBarClick(event) {
    const rect = bar.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const dx = event.clientX - centerX;
    const dy = event.clientY - centerY;
    
    // acinin radyan degeri
    const angleRad = (angleCurrent * Math.PI) / 180;
    
    const rotatedX = dx * Math.cos(-angleRad) - dy * Math.sin(-angleRad);
    
    const clickX = rect.width / 2 + rotatedX;
    const distanceToCenter = rotatedX;

    const mass = nextMass;
    nextMass = Math.floor(Math.random() * 10) + 1;
    const weightElement = createWeightElement(mass, clickX);
    
    weights.push({
        mass: mass,
        distance: distanceToCenter,
        element : weightElement
    })
    updatePhysics();
    console.log("olusturulmus weight: ", {mass, distanceToCenter});
    console.log("olusturulan weight'in X pos:", clickX)
}

function createWeightElement(mass, clickXInsideBar) {
    const weightElement = document.createElement('div');
    weightElement.classList.add("weight");
    weightElement.textContent = mass;

    const baseSize = 20;
    const sizeRate = 5;
    const elementSize = baseSize + (mass * sizeRate);

    weightElement.style.width = elementSize + "px";
    weightElement.style.height = elementSize + "px";

    weightElement.style.left = (clickXInsideBar - elementSize / 2) + "px";
    weightElement.style.top = (-elementSize - 2) + "px";

    if(mass <= 3) {
        const greens = ["#90EE90", "#20cd20b9", "#228B22"];
        weightElement.style.background = greens[mass - 1];
        weightElement.style.borderColor = greens[mass - 1];
    } else if (mass <= 7) {
        const yellows = ["#FFFF99", "#ffeb3b", "#FFD700"];
        weightElement.style.background = yellows[mass - 4];
        weightElement.style.borderColor = yellows[mass - 4];
    } else {
        const reds = ["#FF7F7F", "#ff4c4c", "#FF0000"];
        weightElement.style.background = reds[mass - 8];
        weightElement.style.borderColor = reds[mass - 8];
    }

    bar.appendChild(weightElement);

    return weightElement;
}

function updatePhysics() {
    let torqueLeft = 0;
    let torqueRight = 0;
    let massLeft = 0;
    let massRight = 0;

    weights.forEach(weight => {
        if (weight.distance < 0) {
            massLeft += weight.mass;
            torqueLeft += weight.mass * Math.abs(weight.distance);
        } else {
            massRight += weight.mass;
            torqueRight += weight.mass * weight.distance;
        }
    });

    const torqueNet = torqueRight - torqueLeft;
    const rawAngle = torqueNet * 0.1;
    const maxAngle = 30;

    if (rawAngle > maxAngle) {
        angleTarget = maxAngle;
    } else if (rawAngle < -maxAngle) {
        angleTarget = -maxAngle;
    } else {
        angleTarget = rawAngle;
    }

    leftWeightSpan.textContent = massLeft;
    rightWeightSpan.textContent = massRight;
    angleSpan.textContent = angleTarget.toFixed(1) + "°";
}

function animate() {
    const smoothing = 0.1;

    angleCurrent += (angleTarget - angleCurrent) * smoothing;
    bar.style.transform = 'rotate(' + angleCurrent + 'deg)';

    requestAnimationFrame(animate);
}


function resetSeesaw() {
    weights.forEach(weight => {
        weight.element.remove();
    })

    weights = [];
    angleTarget = 0;
    // angleCurrent = 0; >kills the smoothness when used

    leftWeightSpan.textContent = "0";
    rightWeightSpan.textContent = "0";
    angleSpan.textContent = "0°";

}

bar.addEventListener("mousemove", (e) => {
    const rect = bar.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    
    const angleRad = (angleCurrent * Math.PI) / 180;
    const rotatedX = dx * Math.cos(-angleRad) - dy * Math.sin(-angleRad);
    
    const hoverX = rect.width / 2 + rotatedX;
    
    const previewSize = 20 + (nextMass * 5);
    weightPreview.textContent = nextMass;
    weightPreview.style.width = previewSize + "px";
    weightPreview.style.height = previewSize + "px";
    weightPreview.style.left = (hoverX - previewSize / 2) + "px";
    weightPreview.style.top = (-previewSize - 2) + "px";
});

bar.addEventListener("mouseleave", () => {
    weightPreview.style.opacity = "0";
});

bar.addEventListener("mouseenter", () => {
    weightPreview.style.opacity = "1";
})
animate();