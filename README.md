# Seesaw Simulation

Interactive simulation of a seesaw with physics built with pure HTML, CSS and JavaScript.

## Features

- **Interactive Physics**: Click anywhere on the seesaw and watch how it reacts.
- **Dynamic Weight Generation**: Random mass values from 1kg to 10kgs with preview before placement.
- **Visual Feedback**:
    - Color-coded weight based on mass.
    - Arrow indicated previews for showing the exact placement.
    - Smooth animations.
- **Sound Effects**: Sound effect with mass-based pitch variation on weight placement and a sound effect on reset.
- **Weight History**: All placed weights can be tracked through the history section with detailed informations.
- **Accurate Rotation**: Precise weight placement even when the bar is tilted.

## How to Use

1. Hover over the seesaw bar to see a preview of the next weight.
2. Click anywhere you want on the seesaw bar to place the weight.
3. Watch the seesaw tilt based on torque physics.
4. Check the info panel for:
    - Total weight on each side
    - Current rotation angle
5. View placement history in the log section below the info panel and seesaw itself.
6. Click "Reset" to clear all weights and history to start over.

## Phyics Concepts

- **Torque Calculation**: Weight x Distance from center.
- **Balance Point**: Seesaw tilts based on net torque difference.
- **Angle Clamp**: The seesaw tilt is clamped to ±30 to simulate the physics more realistic.
- **Smooth Animation**: Animated rotation for a natural feel.

## Technologies Used
- HTML5
- CSS3
- JavaScript

## File Structure

seesaw/
├── index.html
├── style.css
├── script.js
├── assets
│    ├── pop.mp3
│    └── delete.mp3
└── README.md