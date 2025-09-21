import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./components/ThemeToggle";

function App() {
  const [theme, setTheme] = useState('dark'); // Default to dark theme

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    // Set dark as default if nothing is stored
    const initialTheme = storedTheme || 'dark';
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      <Toaster />
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home theme={theme} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;