import { useTheme } from "../hooks/useTheme";
import modeIcon from "../assets/mode-icon.svg"
// Styles
import "./ThemeSelector.css";

const themeColors = ["#58249c", "#249c6b", "#d9534f","#f0ad4e"];

export default function ThemeSelector() {
  const { changeColor,mode,changeMode } = useTheme();
    
    const changeModeHandler = () => {
        changeMode(mode === 'dark' ? 'light' : 'dark')
    }
    console.log(mode)

  return (
    <div className="theme-selector">
        <div className="mode-toggle">
            <img 
            src={modeIcon} 
            alt="dark/light mode toggle icon" 
            onClick={changeModeHandler}
            style ={{filter : mode === 'dark' ? 'invert(100%)' : 'invert(20%)'}}
            />
        </div>
      <div className="theme-buttons">
        {themeColors.map((color) => (
          <div
            key={color}
            onClick={() => changeColor(color)}
            style={{ background: color }}
          />
        ))}
      </div>
    </div>
  );
}
