import { ThemeContext } from '../context/ThemeContext'
import { useContext } from 'react'

export const useTheme = () => {
    const context = useContext(ThemeContext)

    if(context === undefined){
        throw new Error("useTheme() should be used inside the scope of ThemeProvider")
    }

    return context
}