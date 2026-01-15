import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LoadingScreen } from './components/LoadingScreen';
import { Welcome } from './components/Welcome';
import { Onboarding } from './components/Onboarding';
import { Dashboard } from './components/Dashboard';
import { AppState } from './types';

function App() {
  const [appState, setAppState] = useState<AppState>(AppState.LOADING);
  
  // Lifted state for Theme Management
  // Default to true (Dark Mode)
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Apply theme class to html element whenever state changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLoadingComplete = () => {
    setAppState(AppState.WELCOME);
  };

  const handleWelcomeComplete = () => {
    setAppState(AppState.ONBOARDING);
  };

  const handleOnboardingComplete = () => {
    setAppState(AppState.READY);
  };

  const handleLogout = () => {
    // Reset to Welcome screen on logout
    setAppState(AppState.WELCOME);
  };

  return (
    <AnimatePresence mode="wait">
      {appState === AppState.LOADING && (
        <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
      )}

      {appState === AppState.WELCOME && (
        <Welcome 
          key="welcome"
          onComplete={handleWelcomeComplete} 
          isDarkMode={isDarkMode}
          onToggleTheme={setIsDarkMode}
        />
      )}

      {appState === AppState.ONBOARDING && (
        <Onboarding 
          key="onboarding"
          onComplete={handleOnboardingComplete} 
          isDarkMode={isDarkMode}
          onToggleTheme={setIsDarkMode}
        />
      )}
      
      {appState === AppState.READY && (
        <Dashboard 
          key="dashboard"
          isDarkMode={isDarkMode}
          onToggleTheme={setIsDarkMode}
          onLogout={handleLogout}
        />
      )}
    </AnimatePresence>
  );
}

export default App;