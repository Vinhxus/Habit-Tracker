import { format, isToday } from "date-fns"
import Button from "./component/Button"
import { useHabits } from "./context/useHabits"

type HeaderProps = {
    visibleDates: Date[]
    onPrev : () => void
    onNext : () => void
}

export function Header({visibleDates, onPrev, onNext} : HeaderProps){
    const {habits} = useHabits()
    const doneToday = habits.filter( h => h.completions.some(c => isToday(c))).length
    
    const dateRange = `${format(visibleDates[0], "MMM d")} - ${format(visibleDates.at(-1)!, "MMM d")}`
    return(
        <div className="flex items-center justify-between">
            <div className = "flex flex-col">
                <h1 className="text-3xl font-bold text-yellow-500"> Habit Tracker</h1>
                <span className ="text-zinc-400 text"> {doneToday} / {habits.length} done today </span>
            </div>
            <div className = "flex flex-col">
                <span className = "text-zinc-400 text-sm text-center"> {dateRange} </span>
                <div className="flex gap-2"> 
                    <Button onClick = {onPrev} className="bg-amber-50">Prev</Button>
                    <Button onClick = {onNext} 
                        disabled={visibleDates.some(d => isToday(d))} 
                        className="bg-amber-50"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
