import { useState } from "react";

interface addAbilityProps {
  add: (newAbility: string) => void;
}
export const AddAbility = ({add}: addAbilityProps) => {
  const [ability, setAbility] = useState("")
  const [error, setError] = useState(false)
  
  function handleAdd(){
    if(ability.length <= 5){
      setError(true)
      return
    }

    add(ability)
    setAbility("")
  }
  return (
    <span>
      <input type='text' placeholder='Nome da habilidade'
      value={ability}
      onChange={(e)=> {
        setAbility(e.target.value)
        if(error){
          setError(false)
        }}}/>
      {error && (<p>Tamanho mínimo de caracteres: 6</p>)}
      <button type='button' onClick={()=>handleAdd()}>Adicionar</button>
    </span>
  )
}