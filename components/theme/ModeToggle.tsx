"use client";

import { useTheme } from "next-themes";
import { useState } from "react";

import { Switch } from "../ui/switch";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [isSwitching, setIsSwitching] = useState(false);

  const handleToggle = () => {
    setIsSwitching(true);
    setTimeout(() => {
      setTheme(theme === "dark" ? "light" : "dark");
      setIsSwitching(false);
    }, 200); // 200ms gecikme (isteğe bağlı olarak ayarlanabilir)
  };

  return (
    <Switch
      onClick={handleToggle}
      disabled={isSwitching} // Animasyon sırasında geçici olarak devre dışı bırakılır
    />
  );
}
