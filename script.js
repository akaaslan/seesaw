const bar = document.getElementById('bar');

let weights = [];

bar.addEventListener('click', handleBarClick);

function handleBarClick(event) {
    const rect = bar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const centerX = rect.width / 2;
    const distanceToCenter = clickX - centerX;

    const mass = Math.floor(Math.random() * 10) + 1;

    const weightElement = createWeightElement(mass);
    
    weights.push({
        mass: mass,
        distance: distanceToCenter,
        element : weightElement
    })
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

    weightElement.style.left = (clickXInsideBar - elementSize / 2) + "px";
    weightElement.style.top = (-elementSize - 5) + "px";

    bar.appendChild(weightElement);
    
    return weightElement;
}