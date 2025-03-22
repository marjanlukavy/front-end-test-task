import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark" | "auto";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("auto");

  // Apply theme on mount and when it changes
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Update HTML data attribute and save to localStorage when theme changes
  useEffect(() => {
    const applyTheme = () => {
      const root = document.documentElement;

      if (theme === "auto") {
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        root.dataset.theme = prefersDark ? "dark" : "light";

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e: MediaQueryListEvent) => {
          root.dataset.theme = e.matches ? "dark" : "light";
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
      } else {
        root.dataset.theme = theme;
      }
    };

    localStorage.setItem("theme", theme);
    applyTheme();
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
