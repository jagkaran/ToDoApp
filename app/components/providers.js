// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { createContext, useEffect, useState } from "react";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

export const theme = extendTheme({ colors });

export const Context = createContext({ user: {} });

export function Providers({ children }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch("/api/auth/me")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) setUser(data.user);
      });
  }, []);
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <Context.Provider value={{ user, setUser }}>
          {children}
        </Context.Provider>
      </ChakraProvider>
    </CacheProvider>
  );
}
