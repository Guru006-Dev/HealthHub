# HealthHub 🏥
**Empowering First Aid Education for Autistic Children**

HealthHub is an interactive, sensory-friendly web application designed to teach critical first aid skills to children, specifically those on the autism spectrum. It combines simplified tutorials, gamification, and "Calm Mode" accessibility features to create a safe learning environment.

## 🚀 Features
- **Interactive Lessons**: Step-by-step guides for Bleeding, Burns, Nosebleeds, and Fainting.
- **Sensory-Friendly UI**: Toggle between "Normal", "Calm" (muted colors), and "Dark" modes.
- **Safety Profile**: A form-based page to save emergency info and sensory triggers (uses LocalStorage).
- **My First Aid Kit**: A gamified checklist to build a real-world kit.
- **Emergency Tools**: "Find Help" map and direct emergency dial instructions.
- **Quiz System**: To test knowledge retention.

## 📂 Folder Structure
Here is a quick guide to the source code:

- **`src/components/`**: Reusable UI blocks.
  - `Navbar.jsx`: Navigation logic.
  - `ParallaxBackground.jsx`: The animated clouds/scenery.
  - `AudioButton.jsx`: Text-to-speech component.
- **`src/pages/`**: The main views of the application.
  - `MedicalProfilePage.jsx`: The "Safety Profile" form.
  - `KitPage.jsx`: The "First Aid Kit" checklist.
  - `LessonPage.jsx`: Renders individual first aid lessons.
- **`src/data/`**: Static content.
  - `lessonsData.js`: Contains all the text, images, and video IDs for lessons.
- **`src/utils/`**: Helper functions.
  - `soundEffects.js`: Manages UI sounds.

## 🛠️ How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Guru006-Dev/HealthHub.git
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm run dev
    ```
4.  **Open in Browser:**
    Usually `http://localhost:5173`



---
*Mid Term Project - Full Stack Development*
