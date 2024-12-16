import React, {createContext, useState, useEffect, useMemo} from 'react';
import {Appearance} from 'react-native';
import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme as DarkTheme,
} from 'react-native-paper';

// Define custom themes with onboarding background colors
const lightTheme = {
  ...DefaultTheme,
  colors: {
    green: '#388E3C',
   
    blue: '#4a51a3', // Deep Blue
  },
  roundness: 9,
};

const darkTheme = {
  ...DarkTheme,
  colors: {
    green: '#388E3C',
  
    blue: '#4a51a3', // Deep Blue
  },
  roundness: 9,
};

const ThemeContext = createContext();

const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState(Appearance.getColorScheme());

  return (
    <ThemeContext.Provider value={{theme: currentTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export {ThemeContext, ThemeProvider};
