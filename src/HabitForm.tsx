import Button from "./component/Button"
import { useState, type SubmitEvent } from 'react'
import { useHabits } from "./context/useHabits";


export function HabitForm(){
    const [name, setName] = useState("");
    const {addHabit} = useHabits()

    function handleSubmit( e : SubmitEvent){
        e.preventDefault();

        if (name.trim() === "") return;

        addHabit(name)
        setName("")
        console.log(name)
    }

    return(
        <form className="flex gap-3" onSubmit={handleSubmit}>
            <input
                value = {name}
                onChange={ e => setName(e.target.value)}
                className = "flex-1 border-2 bg-zinc-300 rounded p-2"
                placeholder= "New habit .."
            />
            <Button>
                Add habit
            </Button>
        </form>
    )
}