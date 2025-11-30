const bar = document.getElementById('bar');

let weights = [];

bar.addEventListener('click', handleBarClick);

let angleCurrent = 0;
let angleTarget = 0;
const leftWeightSpan = document.getElementById("left-weight")
const rightWeightSpan = document.getElementById("right-weight")
const angleSpan = document.getElementById("angle")

function handleBarClick(event) {
    const rect = bar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const centerX = rect.width / 2;
    const distanceToCenter = clickX - centerX;

    const mass = Math.floor(Math.random() * 10) + 1;

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
        targetAngle = maxAngle;
    } else if (rawAngle < -maxAngle) {
        targetAngle = -maxAngle;
    } else {
        targetAngle = rawAngle;
    }

    leftWeightSpan.textContent = massLeft;
    rightWeightSpan.textContent = massRight;
    angleSpan.textContent = targetAngle.toFixed(1) + "°";
}