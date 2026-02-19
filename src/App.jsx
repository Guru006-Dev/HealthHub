// Outputting the full App.jsx with MainLayout
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import PageTransition from './components/PageTransition';
import ParallaxBackground from './components/ParallaxBackground';
import FloatingToggle from './components/FloatingToggle';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import LoginPage from './pages/LoginPage';
import './styles/themes.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const HomePage = React.lazy(() => import('./pages/HomePage'));
const LessonPage = React.lazy(() => import('./pages/LessonPage'));
const QuizPage = React.lazy(() => import('./pages/QuizPage'));
const FindHelpPage = React.lazy(() => import('./pages/FindHelpPage'));
const MedicalProfilePage = React.lazy(() => import('./pages/MedicalProfilePage'));
const KitPage = React.lazy(() => import('./pages/KitPage'));
const MathGamePage = React.lazy(() => import('./pages/MathGamePage'));
const GamesPage = React.lazy(() => import('./pages/GamesPage'));
const GermBusterPage = React.lazy(() => import('./pages/GermBusterPage'));
const SensoryLogicPage = React.lazy(() => import('./pages/SensoryLogicPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const DashboardPage = React.lazy(() => import('./pages/DashboardPage'));

// AnimatedRoutes component to use useLocation hook
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <React.Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={
            <PageTransition>
              <DashboardPage />
            </PageTransition>
          } />
          <Route path="/lessons" element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          } />
          <Route path="/lesson/:id" element={
            <PageTransition>
              <LessonPage />
            </PageTransition>
          } />
          <Route path="/quiz" element={
            <PageTransition>
              <QuizPage />
            </PageTransition>
          } />
          <Route path="/find-help" element={
            <PageTransition>
              <FindHelpPage />
            </PageTransition>
          } />
          <Route path="/profile" element={
            <PageTransition>
              <MedicalProfilePage />
            </PageTransition>
          } />
          <Route path="/kit" element={
            <PageTransition>
              <KitPage />
            </PageTransition>
          } />
          <Route path="/math-game" element={
            <PageTransition>
              <MathGamePage />
            </PageTransition>
          } />
          <Route path="/games" element={
            <PageTransition>
              <GamesPage />
            </PageTransition>
          } />
          <Route path="/germ-buster" element={
            <PageTransition>
              <GermBusterPage />
            </PageTransition>
          } />
          <Route path="/sensory-math" element={
            <PageTransition>
              <SensoryLogicPage />
            </PageTransition>
          } />
          <Route path="/about" element={
            <PageTransition>
              <AboutPage />
            </PageTransition>
          } />
        </Routes>
      </AnimatePresence>
    </React.Suspense>
  );
};

const MainLayout = ({ mode, toggleMode }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  // Derived states for compatibility
  const isCalmMode = mode === 'calm';
  // const isDarkMode = mode === 'dark'; // Unused in layout props currently

  return (
    <div className="app">
      <ParallaxBackground isCalmMode={isCalmMode} />
      {!isLoginPage && <Navbar isCalmMode={isCalmMode} />}
      {!isLoginPage && <FloatingToggle currentMode={mode} toggleMode={toggleMode} />}
      <main style={{ position: 'relative', zIndex: 1, paddingBottom: isLoginPage ? 0 : '5rem' }}>
        <AnimatedRoutes />
      </main>
      {!isLoginPage && <Footer />}
      <ToastContainer />
    </div>
  );
};

function App() {
  const [mode, setMode] = useState('default'); // 'default', 'calm', 'dark'

  const toggleMode = () => {
    setMode(prev => {
      let nextMode = 'default';
      if (prev === 'default') nextMode = 'calm';
      else if (prev === 'calm') nextMode = 'dark';
      else nextMode = 'default';

      const modeLabels = { default: 'Normal Mode', calm: 'Calm Mode', dark: 'Dark Mode' };

      toast.info(`Switched to ${modeLabels[nextMode]}`, {
        position: "bottom-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: nextMode === 'dark' ? "dark" : "light",
      });
      return nextMode;
    });
  };

  useEffect(() => {
    document.body.classList.remove('calm-mode', 'dark-mode');
    if (mode === 'calm') document.body.classList.add('calm-mode');
    if (mode === 'dark') document.body.classList.add('dark-mode');
  }, [mode]);

  return (
    <ErrorBoundary>
      <Router>
        <MainLayout mode={mode} toggleMode={toggleMode} />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
