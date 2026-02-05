# HealthHub Project Report

## 1. About the Use Case
**HealthHub** is an interactive educational web application designed to teach first aid skills to children, with a specific focus on inclusivity for autistic users. The application provides step-by-step tutorials for common emergencies (Bleeding, Burns, etc.) using a sensory-friendly interface. Key features include a "Calm Mode" to reduce sensory overload, a simplified linear navigation structure, and a personalized "Safety Profile" where users can list their sensory triggers and calming strategies. The goal is to empower neurodivergent children to respond safely to emergencies in an environment that minimalizes anxiety.

## 2. GitHub Repository
**URL:** [https://github.com/Guru006-Dev/HealthHub](https://github.com/Guru006-Dev/HealthHub)

## 3. Extension Features (Forms)
We extended the project by adding a **Medical Safety Profile** (`MedicalProfilePage.jsx`). This new page uses React Forms to allow children or parents to save emergency contact info and sensory preferences locally. We also added a **First Aid Kit Checklist** to gamify the learning experience.

## 4. Concept Verification (Code Proof)

Here is the detailed proof of where each concept is implemented across the **entire project**:

### 1. Function Component
We used Functional Components throughout the application as the primary building block. A key example is the main **App** component.
*   **File**: `src/App.jsx`
*   **Location**: Line 73
*   **Code**: `function App() { ... }`

### 2. Class Component
We implemented a `PrivacyNotice` component using the traditional `class` syntax to satisfy the requirement for legacy React support.
*   **File**: `src/pages/MedicalProfilePage.jsx`
*   **Location**: Lines 24-39
*   **Code**: `class PrivacyNotice extends Component { render() { ... } }`

### 3. State Management
We used the `useState` Hook extensively for managing application state, such as the current Theme Mode (Normal/Calm/Dark).
*   **File**: `src/App.jsx`
*   **Location**: Line 74
*   **Code**: `const [mode, setMode] = useState('default');`

### 4. Stateless Component
The `AudioButton` component is a perfect example of a stateless component; it receives a `text` prop and renders a button without maintaining any internal state.
*   **File**: `src/components/AudioButton.jsx`
*   **Location**: Lines 4-42
*   **Code**: `const AudioButton = ({ text }) => { ... }`

### 5. Events
We handle user interactions using standard React events. For example, the `onClick` event in the Audio Button triggers the text-to-speech function.
*   **File**: `src/components/AudioButton.jsx`
*   **Location**: Line 21
*   **Code**: `onClick={speak}`

### 6. Forms
The **Safety Profile** feature implements a controlled form using React state to handle user input.
*   **File**: `src/pages/MedicalProfilePage.jsx`
*   **Location**: Lines 88-158
*   **Code**: `<form onSubmit={handleSubmit}> ... </form>`
