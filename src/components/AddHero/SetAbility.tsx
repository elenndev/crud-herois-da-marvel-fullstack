import { useState } from "react";

interface addAbilityProps {
  error: boolean;
  editingAbility: null | string;
  add: (newAbility: string) => void;
  remove: (ability: string) => void;
  cancel: () => void;
  cleanError: () => void;
}
export const SetAbility = ({ editingAbility, error, add, remove, cancel, cleanError }: addAbilityProps) => {
  const [ability, setAbility] = useState("")
  
  function handleAdd(){
    if(ability.length >= 5){
      add(ability)
      setAbility("")
    }
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
        minLength={5}
        maxLength={50}
        onChange={(e)=> {
          setAbility(e.target.value)
          cleanError()}}/>
        {error && (<p className="border-danger px-2 rounded-[3em]">Informe ao menos 2 habilidades do herói</p>)}
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