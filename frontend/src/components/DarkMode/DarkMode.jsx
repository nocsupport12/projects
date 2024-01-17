import React, { useState, useEffect } from 'react';
import Sun from '../../assets/sun.png'; 
import Moon from '../../assets/moon.png'; 

const DarkMode = () => {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
      // Get the saved theme preference from local storage
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        setTheme(savedTheme);
      } else {
        // If no preference is saved, set the default theme to "light"
        setTheme("light");
      }
    }, []);
  
    useEffect(() => {
      // Update the class on the root HTML element whenever the theme changes
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
  
      // Save the current theme preference to local storage
      localStorage.setItem("theme", theme);
    }, [theme]);
  
    const handleThemeSwitch = () => {
     
      setTheme(theme === "dark" ? "light" : "dark");
    };

  return (
    <button onClick={handleThemeSwitch}>
        <img
            src={theme === "light"? Moon : Sun}
            alt={theme === "light" ? "Moon" : "Sun"}
            className="h-6 w-6 md:mx-3"
        />
    </button>
  );
};

export default DarkMode;
