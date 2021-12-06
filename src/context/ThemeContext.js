import { createContext, useReducer } from "react";

export const ThemeContext = createContext();

const themeReducer = (state, action) => {
  // if(action.type === 'CHANGE_COLOR'){
  //     return {...state, defaultColor:action.payload}
  // }else{
  //     return state
  // }
  switch (action.type) {
    case "CHANGE_COLOR":
      return { ...state, defaultColor: action.payload };
    case "CHANGE_MODE":
      return { ...state, mode: action.payload };
    default:
      return state;
  }
};

export function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, {
    defaultColor: "#555",
    mode: "dark",
  });

  const changeMode = (mode) => {
    dispatch({ type: "CHANGE_MODE", payload: mode });
  };

  const changeColor = (newColor) => {
    dispatch({ type: "CHANGE_COLOR", payload: newColor });
  };

  return (
    <ThemeContext.Provider value={{ ...state, changeColor, changeMode}}>
      {children}
    </ThemeContext.Provider>
  );
}
