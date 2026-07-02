import { type ReactNode } from "react"
import {isSameDay} from "date-fns"
import type { Habit } from "./useHabits"
import { HabitContext } from "./useHabits"
import { useLocalStorage } from "../hook/localStorage"

type HabitProviderProps = {
    children: ReactNode
}


export function HabitProvider({children}: HabitProviderProps){
  const [habits, setHabits] = useLocalStorage<Habit[]>("Habits", [])
  
  function addHabit(name : string){
    setHabits( cur => [...cur, { id: crypto.randomUUID(), name: name, completions: [new Date()] }]);
  }

  function delHabit(id : string){
    setHabits( cur => cur.filter(h => h.id !== id))
  }

  function toggleHabit( id: string, date: Date){
    setHabits(cur =>
      cur.map(h => {
        if (h.id != id) return h

        const alreadyDone = h.completions.some(c => isSameDay(c,date))
        const completions = alreadyDone 
          ? (h.completions.filter(c => !isSameDay(c,date)))
          : [...h.completions, date] 

        return {...h, completions}
      }),
    )
  }
    return <HabitContext value = {{habits, addHabit, delHabit , toggleHabit}}>{children}</HabitContext>
}

