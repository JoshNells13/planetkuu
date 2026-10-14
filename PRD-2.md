# PLANET KU — INTERACTIVE GALAXY EXPERIENCE

## Product Vision

Develop Planet Ku into a polished, immersive 3D educational space playground for elementary school children. The website must open directly into a living, interactive solar system. Do not create a traditional landing page, hero section, or introductory marketing page.

The solar system is the homepage, navigation environment, and primary learning experience.

## Visual Direction

- Premium stylized 3D cartoon aesthetic.
- Deep navy and indigo space, subtle purple nebulae, atmospheric lighting, and soft bloom.
- Eight visually distinct planets with detailed materials and recognizable features.
- Glowing elliptical orbit paths, animated directional markers, and a slowly animated starfield.
- Floating glassmorphism and holographic navigation panels.
- Smooth camera movement and restrained transitions.
- Consistent visual language across desktop, tablet, and mobile.
- No emoji as substitutes for actual character art, icons, or 3D assets.

## Core Experience

### 1. Living Solar System

Build the primary scene with React Three Fiber, Three.js, Drei, and TypeScript.

Implement:
- Interactive Sun and all eight planets.
- Continuously animated planetary revolution and rotation.
- Selectable planets using pointer and touch input.
- OrbitControls with sensible zoom limits and camera reset.
- Smooth camera focus when a planet is selected.
- Planet highlight, name labels, and contextual information panels.
- Play, pause, speed controls, and orbit visibility toggle.
- A reset-to-solar-system overview action.
- Responsive scene sizing and performance-aware rendering.
- Loading indicators and a usable fallback if WebGL or 3D assets fail.

Use visually simplified orbital distances and planet sizes while keeping astronomical information accurate. Clearly distinguish artistic scale from real astronomical proportions.

### 2. Floating Navigation

Build a floating navigation interface integrated into the galaxy scene.

Include:
- Galaxy overview.
- Missions.
- Achievements and collectibles.
- Astronomy encyclopedia.
- Quizzes.
- Astro assistant.
- Settings and accessibility.

Panels should open as compact holographic overlays without navigating away from the galaxy unnecessarily. Support closing, reopening, keyboard focus, touch input, and reduced-motion preferences.

### 3. Astro Mascot

Implement reusable AstroMascot and AstroDialogue components.

Astro should have a consistent cartoon astronaut design with a white suit, blue and purple accents, a reflective helmet, and friendly expressions.

Support idle floating, waving, discovery reactions, mission guidance, correct-answer celebrations, and gentle hints after incorrect answers.

Use context-aware dialogue events and avoid repeatedly interrupting users. If the 3D model is unavailable, use a consistent illustration fallback rather than an emoji.

### 4. Interactive Planet Activities

Create distinct activities for each planet.

- Mercury: explore craters.
- Venus: learn about its dense atmosphere.
- Earth: explore rotation and the day-night cycle.
- Mars: discover why its surface appears red.
- Jupiter: compare planetary sizes and examine the Great Red Spot.
- Saturn: inspect the rings from multiple angles.
- Uranus: explore its unusual axial tilt.
- Neptune: learn about its atmosphere and blue appearance.

Activities must be interactive, educational, and connected to the mission system.

### 5. Rocket and Lunar Easter Eggs

Add an interactive rocket launch sequence from Earth, followed by a journey into orbit. Include optional spacecraft flybys and small environmental events.

Create a discoverable lunar Easter egg inspired by the Apollo 11 landing in 1969. Include an astronaut figure, a historically contextualized American flag, footprints, lunar terrain, and an explanatory interaction. Award a unique Moon Detective badge after completing the discovery challenge.

Do not present historical representations as real-time footage or imply that decorative details are scientifically accurate when they are artistic approximations.

### 6. Mission-Based Learning

Implement these missions:

1. Finding the Red Planet — select Mars correctly; reward 50 XP and Planet Hunter badge.
2. Orbit Keeper — observe Earth's revolution and answer a question; reward 75 XP and Orbit Expert badge.
3. Day and Night Mystery — interact with Earth's rotation and identify illuminated versus dark regions; reward 75 XP and Earth Guardian badge.
4. Saturn's Rings — inspect Saturn's ring system and answer a question; reward 100 XP and Saturn Explorer badge.
5. Solar System Challenge — complete a five-question quiz and calculate rewards from the result.

Mission completion must be validated from actual user actions. Rewards must not be repeatable indefinitely.

Persist progress in localStorage, validate stored data, handle malformed or missing records safely, and preserve progress after refresh. Include a dedicated achievements panel.

Allow users to explore freely without requiring a linear mission sequence.

### 7. UX and Engineering

- Use reusable React components, TypeScript types, and structured astronomy and mission data.
- Separate scene rendering, navigation, learning interactions, and persistence logic.
- Use lazy loading, optimized assets, adaptive graphics quality, and limited particle counts.
- Avoid unnecessary rerenders in the 3D scene.
- Support mouse, keyboard, and touch.
- Provide loading, empty, error, and fallback states.
- Respect reduced-motion settings and provide accessible text alternatives.
- Keep educational copy short, accurate, friendly, and suitable for elementary school students.
- Avoid unsupported claims and distinguish educational simplifications from actual astronomical measurements.

## Definition of Done

The result must be a working, interactive experience rather than a static mockup.

A user must be able to open the website directly into the galaxy, select and inspect planets, control the simulation, launch a rocket, interact with Astro, complete missions, earn non-repeatable rewards, discover the lunar Easter egg, and resume saved progress after refreshing the page.

Implement and test the core solar-system interaction before adding optional visual effects. Do not replace working interactions with placeholder buttons or nonfunctional panels.