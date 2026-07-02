import Button from "./component/Button"
import { startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns"
import { format, isSameDay , isFuture, subDays} from "date-fns"
import { useHabits, type Habit } from "./context/useHabits"
import { useState } from "react"


type HabitListProps = {
    visibleDates : Date[]
}

export function HabitList({visibleDates} : HabitListProps) {
    const {habits} = useHabits()
    if (habits.length === 0){
        return(
            <p className = " text-pink-300 text-center"> No habit yet. Add one above to get started. </p>
        )
    }
    
    return (
        <div className="flex flex-col gap-3 text-blue-300">
            {habits.map(habit => (
                <HabitItem visibleDates={visibleDates} key={habit.id} habit={habit} />
            ))}
        </div>
    )
}

type HabitItemProps = {
    habit: Habit
    visibleDates : Date[]
}

function HabitItem({ habit, visibleDates }: HabitItemProps) {
    const {delHabit, toggleHabit} = useHabits()
    const streak = countStreak(habit.completions)

    return (
        <div className="rounded-2xl bg-zinc-800 p-4 flex flex-col gap-2.5 border-2 border-zinc-700">
            <div className="flex justify-between items-center"> 
                <div className= "flex gap-1.5 justify-center items-center">
                    <span className="font-semibold block text-white text-lg"> {habit.name} </span>
                    { 
                        (streak !== 0 && (
                            <span className="text-sm text-zinc-400"> 🔥 {streak} </span>
                        ))
                    }
                    
                </div>
                <Button 
                    variant="delete"
                    onClick={() => delHabit(habit.id)}
                > 
                    delete 
                </Button>
            </div>
            
            <div className="flex gap-1.5">
                {visibleDates.map(date => (
                    // Thêm key ở đây để tránh lỗi React báo thiếu key
                    <Button 
                        key={date.toISOString()} 
                        className="flex flex-col items-center p-2 items-center justify-center flex-1 rounded-lg"
                        disabled = {isFuture(date)}
                        onClick={() => toggleHabit(habit.id, date)}
                        variant = {habit.completions.some(d => isSameDay(date,d)) ? 
                            "primary" : "secondary"
                        }
                    >
                        <span className="font-medium text-xs text-zinc-400"> {format(date, "EEE")} </span>
                        <span className="text-base font-bold text-white"> {format(date, "d")}</span>
                    </Button>
                ))}
            </div>
        </div>
    )
}

function countStreak(completions: Date[]){
    let streak = 0
    let date = new Date()
    while (completions.some(c => isSameDay(c,date))){
        streak++
        date = subDays(date,1)
    }

    return streak
}

