# HealthHub Code Walkthrough

This document explains the core logic of the **HealthHub** application, file by file.

## 0. Technical Architecture Note (Crucial for Exams)
**This project uses 100% Functional Components.**
There are **NO Class Components** in this codebase.
*   **Why?**: Modern React (handling state with **Hooks**) is cleaner, faster, and easier to read than old Classes.
*   **The Equivalent**: Wherever you see `useState`, that is replacing `this.state`. Wherever you see `useEffect`, that replaces `componentDidMount`.

---

## 1. Key Hooks Used (Vital Concepts)
We use these specific Hooks to make the app interactive:

*   **`useState`**: The "Memory" of the component.
    *   *Used for*: Storing the Theme Mode, Quiz Score, and Current Lesson Step.
*   **`useEffect`**: The "Setup" function. Runs when the component loads.
    *   *Used for*: Getting your GPS location (`FindHelpPage`) or shuffling the questions (`QuizPage`).
*   **`useRef`**: Like a direct line to a specific HTML element.
    *   *Used for*: Watching the scroll position of specific lesson cards in `HomePage` (Scroll Spy).
*   **`useParams`**: Reads the URL.
    *   *Used for*: Knowing which lesson to load when the URL is `/lesson/bleeding`.
*   **`useScroll`** (from framer-motion): Detecting scrolling.
    *   *Used for*: Shrinking the Navbar when you scroll down.

---

## 2. Main Entry: `src/App.jsx`
This is the "brain" of the app. It handles **Routing** (switching pages) and **Global State** (Theme Mode).

### Key Logic
*   **Routing**: Uses `react-router-dom`.
    ```javascript
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<IntroPage />} />
      <Route path="/home" element={<HomePage />} />
      ...
    </Routes>
    ```
    *Explanation*: `AnimatePresence` wraps the routes to allow the "page transition" animations (fade in/out) when you switch pages.

*   **Theme Toggle**:
    ```javascript
    const [mode, setMode] = useState('default'); // Stores 'default', 'calm', 'dark'
    useEffect(() => {
        // Updates the <body> class based on mode
        if (mode === 'calm') document.body.classList.add('calm-mode');
    }, [mode]);
    ```
    *Explanation*: When you click the toggle, `setMode` updates the state. The `useEffect` watches this state and adds a CSS class (`.calm-mode`) to the body, which `themes.css` uses to change colors.

---

## 3. Navigation: `src/components/Navbar.jsx`
The top bar. It changes style based on which page you are on.

### Key Logic
*   **Transparency Check**:
    ```javascript
    const isHomePage = location.pathname === '/home' || location.pathname === '/';
    ```
    *Explanation*: Checks if we are on the Intro or Home page. If so, it sets the background to `transparent` so the header floats over the content.

*   **Scroll Detection**:
    ```javascript
    useMotionValueEvent(scrollY, "change", (latest) => { setIsScrolled(latest > 50); });
    ```
    *Explanation*: Using `framer-motion`, this detects if the user has scrolled down 50 pixels. If yes, it shrinks the padding to make the bar more compact.

---

## 4. The Dashboard: `src/pages/HomePage.jsx`
The split-screen layout. Left side scrolls, right side stays stuck.

### Key Logic
*   **Intersection Observer** (The "Scroll Spy"):
    ```javascript
    observerRef.current = new IntersectionObserver((entries) => {
        if (entry.isIntersecting) setActiveLessonId(entry.target.getAttribute('data-id'));
    }, ...);
    ```
    *Explanation*: This complex block watches the lesson cards on the left. When a card (e.g., "Burns") Scrolls into view, it tells React "Burns is active", which updates the right-side image.

*   **Sticky Visuals**:
    ```javascript
    <div className="sticky-visual" ... position: 'sticky' ...>
        <img src={activeLesson.cover} ... />
    </div>
    ```
    *Explanation*: The right side has `position: sticky`. It stays fixed on the screen while you scroll the rest of the page. The image changes based on the `activeLessonId` detected above.

---

## 5. Learning: `src/pages/LessonPage.jsx`
Displays the step-by-step guide and YouTube video.

### Key Logic
*   **Step Navigation**:
    ```javascript
    const [currentStep, setCurrentStep] = useState(0);
    const handleNext = () => setCurrentStep(curr => curr + 1);
    ```
    *Explanation*: Starts at step 0 (index). Clicking "Next" increments the number, which updates the image and text shown.

*   **Progress Bar**:
    ```javascript
    width: `${((currentStep + 1) / totalSteps) * 100}%`
    ```
    *Explanation*: Calculates the percentage (e.g., Step 2 of 4 = 50%) and animates the width of the colored bar.

*   **YouTube Embed**:
    ```javascript
    <iframe src={`https://www.youtube.com/embed/${lesson.videoId}`} ... />
    ```
    *Explanation*: Uses the specific `videoId` from `lessonsData.js` to load the correct tutorial without searching.

---

## 6. Emergency: `src/pages/FindHelpPage.jsx`
The Map feature.

### Key Logic
*   **Geolocation**:
    ```javascript
    navigator.geolocation.getCurrentPosition((pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
    });
    ```
    *Explanation*: Asks the browser "Where am I?". If approved, it sets the `position` state to your GPS coordinates.

*   **Leaflet Map**:
    ```javascript
    <MapContainer center={position} ...>
        <Marker position={position} />
        {hospitals.map(h => <Marker position={[h.lat, h.lng]} />)}
    </MapContainer>
    ```
    *Explanation*: Draws the map. It puts a "You" marker at your `position`, and loops through the (simulated) nearby hospitals to place their markers around you.

---

## 7. Assessment: `src/pages/QuizPage.jsx`
The 5-question test.

### Key Logic
*   **Shuffling Questions**:
    ```javascript
    const startQuiz = () => {
        const shuffled = shuffleArray(allQuestions).slice(0, 5);
        setQuestions(shuffled);
    };
    ```
    *Explanation*: Every time you start, it randomizes the order of questions so you can't just memorize the pattern "A, B, A...".

*   **Scoring**:
    ```javascript
    if (index === currentQ.correct) {
        setScore(score + 1);
    }
    ```
    *Explanation*: Checks if the clicked button index matches the known answer index. If yes, points go up. If 5 questions are done, it shows the "Confetti" screen.
