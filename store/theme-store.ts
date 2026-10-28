'use client'


// create() ek shared store banata hai
import { create } from 'zustand'
import { persist } from 'zustand/middleware'  //this save the state in local browser so refrest dont effect

interface ThemeState{  //"Zustand, mere store ka state ThemeState ke structure ke according hona chahiye."
    isDarkMode:boolean
    toggleTheme :()=>void
}
// create()()
//create ko hum define nahi kar rahe. Zustand library mein woh pehle se defined hai.
//Aur us call se jo function milta hai, usko bhi call karke persist(...) pass kar rahe hain.
export const useThemeStore = create<ThemeState>()(
    persist(
        //set Zustand ka function hai jo store ki state update karta hai
        //toggleTheme ka return type void hai, kyunki iska purpose value return karna nahi, store ki state change karna hai.
        (set)=>({
            isDarkMode:false,
            toggleTheme:()=>set((state)=>({isDarkMode:!state.isDarkMode}))
        }),
        {
            name:'theme-storage'  //Is data ko theme-storage naam ki key ke under save kiya jaata hai.

        }

    )

    
)


//DarkmOde (false) -> Ye initial value hai, yaani jab store pehli baar initialize hota hai aur saved value restore nahi hui hoti, toh dark mode off rahega.

// TypeScript kai baar initial object se types infer kar sakta hai.
//  Lekin create<ThemeState>() likhkar tu explicitly batata hai ki store ko kis interface ko follow karna hai.