'use client'

import { Moon, Sun } from "lucide-react"
import { Button } from "../ui/button"
import { useThemeStore } from "@/store/theme-store"
import { useTheme } from "next-themes"  //next-themes se website ka theme control karna
import { useEffect } from "react"


export default function ThemeToggle(){
    const{ isDarkMode , toggleTheme}= useThemeStore() //toggleTheme → Zustand ki boolean value ko ulta karta hai.
    const{theme , setTheme} = useTheme()  //setTheme("dark") → website ka theme dark set karta hai.

    useEffect(()=>{
        //Agar website dark mode mein hai, lekin Zustand bol raha hai ki dark mode OFF hai, toh Zustand ko bhi ON kar do.
        if(theme === 'dark' && !isDarkMode){
            useThemeStore.setState({isDarkMode:true}) //setState() Zustand store ko directly update karta hai
        } else if (theme === 'light'  && isDarkMode){
            useThemeStore.setState({isDarkMode:false})//gar website light mode mein hai, lekin Zustand bol raha hai dark mode ON hai, toh Zustand ko OFF kar do."
        }

    },[theme,isDarkMode]) //Jab theme ya isDarkMode change hota hai, React effect ko dobara run karta hai.

    const handleToggleTheme = ()=>{
        toggleTheme()
        setTheme(isDarkMode ? 'light' : 'dark')

    }


    return (
        <Button variant={'ghost'} size={'icon'} onClick={handleToggleTheme}>
            <Sun  className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
            <Moon  className="absolute h-5 w-5 rotate-90 transition-all dark:rotate-0 dark:scale-100"/>


        </Button>

    )
}