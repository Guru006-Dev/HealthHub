# HealthHub 🏥
**Empowering First Aid Education for Children**

HealthHub is an interactive, gamified, and sensory-friendly web application designed to teach critical first aid skills to children. With a special focus on accessibility, it features a "Calm Mode" and "Text-to-Speech" support, making it an inclusive learning tool for children on the autism spectrum and those with different learning needs.

## 🌟 Key Features

### 📚 Interactive Learning
- **Step-by-Step Lessons**: Engaging guides for common emergencies like Bleeding, Burns, Nosebleeds, and Fainting.
- **Audio Support**: Integrated **Text-to-Speech** reads instructions aloud for better comprehension.
- **Visual Aids**: Clear illustrations and animations helper children understand complex procedures.

### 🎮 Gamification & Engagement
- **Math & Safety Games**: Fun mini-games like "Apple Math" to keep learning exciting.
- **Quizzes**: Interactive quizzes with instant feedback and confetti celebrations for correct answers.
- **Safety Hero Badges**: Digital rewards for completing lessons and building a first aid kit.
- **Interactive Scenarios**: "What would you do?" scenarios to test practical knowledge.

### ♿ Accessibility First
- **Sensory-Friendly Modes**: Toggle between **Default**, **Calm** (muted soft colors), and **Dark** modes to suit sensory sensitivities.
- **Large Typography**: Easy-to-read text with clear hierarchy.
- **Voice Guidance**: "Speaker" buttons on every page to assist non-readers.

### 🛡️ Practical Tools
- **Emergency Map**: "Find Help" feature locates nearby hospitals and clinics using geolocation.
- **Digital First Aid Kit**: A checklist to help families build a real-world safety kit.
- **Safety Profile**: A personalized "Hero ID Card" generator with emergency contacts and medical triggers.

---

## 💻 Tech Stack

- **Frontend Framework**: [React](https://reactjs.org/) (Vite)
- **Styling**: Vanilla CSS with Glassmorphism design system (`.glass-card`), CSS Variables for theming.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for smooth page transitions and interactive elements.
- **Icons**: [Lucide React](https://lucide.dev/) for consistent, beautiful iconography.
- **Maps**: [React Leaflet](https://react-leaflet.js.org/) & [OpenStreetMap](https://www.openstreetmap.org/) for the "Find Help" feature.
- **Audio**: Web Speech API for Text-to-Speech and Web Audio API for custom sound effects.
- **Routing**: React Router DOM (v6).

---

## 📂 Project Structure

```bash
HealthHub/
├── public/              # Static assets (images, icons)
├── src/
│   ├── assets/          # Local images and media
│   ├── components/      # Reusable UI components
│   │   ├── Navigation/  # Navbar, Footer
│   │   ├── Interactive/ # TextToSpeech, Confetti, MathGame
│   │   └── Layout/      # ParallaxBackground, GlassCard
│   ├── data/            # Static content (lessons, quiz questions)
│   ├── pages/           # Application views
│   │   ├── IntroPage    # Landing experience with parallax
│   │   ├── HomePage     # Main dashboard
│   │   ├── Lessons      # Educational content pages
│   │   ├── Games        # Educational mini-games
│   │   └── Tools        # Location finder, Kit checklist, Profile
│   ├── styles/          # Global styles and themes
│   └── utils/           # Helper functions (sound effects, storage)
└── index.html           # Entry point
```

---

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Guru006-Dev/HealthHub.git
    cd HealthHub
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  **View in Browser**
    Open `http://localhost:5173` to view the application.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Built with ❤️ for a safer future.**
