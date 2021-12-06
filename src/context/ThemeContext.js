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
    default:
      return state;
  }
};

export function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, {
    defaultColor: "blue",
  });

  const changeColor = (newColor) => {
    dispatch({ type: "CHANGE_COLOR", payload: newColor });
  };

  return (
    <ThemeContext.Provider value={{ ...state, changeColor }}>
      {children}
    </ThemeContext.Provider>
  );
}
