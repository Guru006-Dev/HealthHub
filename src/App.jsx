import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
const IntroPage = React.lazy(() => import('./pages/IntroPage'));
const HomePage = React.lazy(() => import('./pages/HomePage'));
const LessonPage = React.lazy(() => import('./pages/LessonPage'));
const QuizPage = React.lazy(() => import('./pages/QuizPage'));
const FindHelpPage = React.lazy(() => import('./pages/FindHelpPage'));
const MedicalProfilePage = React.lazy(() => import('./pages/MedicalProfilePage'));
const KitPage = React.lazy(() => import('./pages/KitPage'));
import PageTransition from './components/PageTransition';
import ParallaxBackground from './components/ParallaxBackground';
import FloatingToggle from './components/FloatingToggle';
import Footer from './components/Footer';
import './styles/themes.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// AnimatedRoutes component to use useLocation hook
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <React.Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <PageTransition>
              <IntroPage />
            </PageTransition>
          } />
          <Route path="/home" element={
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
        </Routes>
      </AnimatePresence>
    </React.Suspense>
  );
};



// ...

function App() {
  const [mode, setMode] = useState('default'); // 'default', 'calm', 'dark'

  // Derived states for compatibility
  const isCalmMode = mode === 'calm';
  const isDarkMode = mode === 'dark';

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
    <Router>
      <div className="app">
        <ParallaxBackground isCalmMode={isCalmMode} />
        <Navbar isCalmMode={isCalmMode} />
        <FloatingToggle currentMode={mode} toggleMode={toggleMode} />
        <main style={{ position: 'relative', zIndex: 1, paddingBottom: '5rem' }}>
          <AnimatedRoutes />
        </main>
        <Footer />
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
