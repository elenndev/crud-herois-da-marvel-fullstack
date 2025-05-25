import { useState } from "react";

interface addAbilityProps {
  editingAbility: null | string;
  add: (newAbility: string) => void;
  remove: (ability: string) => void;
  cancel: () => void;
}
export const SetAbility = ({ editingAbility, add, remove, cancel }: addAbilityProps) => {
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
    <span className='flex flex-col w-full items-center gap-1'>
      {editingAbility ? (
        <span
        className="set-ability flex flex-row flex-wrap items-center justify-center gap-2 w-fit px-3 py-0.5 rounded-[3rem]">
          <p>Habilidade: {editingAbility}</p>
          <button type="button"
          onClick={()=>remove(editingAbility)}
          className='btn-danger py-0.5 px-5 rounded-[2rem]'>
            Remover
          </button>
          <button
          type='button'
          className='btn-blue py-0.5 px-5 rounded-[2rem]'
          onClick={cancel}>
            Cancelar
          </button>
        </span>)
      :
      (<>
        <input type='text' placeholder='Nome da habilidade'
        value={ability}
        onChange={(e)=> {
          setAbility(e.target.value)
          if(error){
            setError(false)
          }}}/>
        {error && (<p>Tamanho mínimo de caracteres: 6</p>)}
        <button 
        type='button' 
        onClick={()=>handleAdd()}
        className='btn-yellow py-0.5 px-5 rounded-[3rem]'>
          Adicionar Habilidade
        </button>
      </>)}
    </span>
  )
}