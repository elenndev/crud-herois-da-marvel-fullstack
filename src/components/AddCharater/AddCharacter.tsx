import React, { useState } from "react"
import { SearchForm } from "./SearchForm"
import { AddAbility } from "./AddAbility";
import { TypeHero } from "../../types/heroes";
import { addNewHero } from "../../utils/fetchAPI";
import { useAppDispatch } from "../../store/storeHooks";
import { addHero } from "../../store/heroesStore";
import { v4 as uuidv4 } from "uuid";

export interface selectedHero {
  marvelId: string;
  name: string;
  thumbnail: string;
}

interface addCharacterProps {
  closeAddCharacter: () => void;
}
export const AddCharacter = ({closeAddCharacter} : addCharacterProps) => {
  const [character, setCharacter] = useState<selectedHero|null>(null)
  const [origin, setOrigin] = useState("")
  const [abilities, setAbilities] = useState<string[]>([])
  const dispatch = useAppDispatch()

  function saveAbility(newAbility: string){
    const updatedAbilities = [...abilities, newAbility];
    setAbilities(updatedAbilities);
  }

  async function handleSubmit(e: React.FormEvent){
    e.preventDefault()
    if(!character){ return }

    const newHero: Omit<TypeHero, '_id'> = {
      abilities,
      marvelId: character?.marvelId,
      name: character?.name,
      origins: origin,
      thumbnail: character?.thumbnail
    }
    
    try{
      const res = await addNewHero(newHero)
      if(typeof res == 'string'){
        dispatch(addHero({ ...newHero, _id: res }))
        closeAddCharacter()
      } else{
        throw new Error('Erro na requisição para registrar o herói')
      }
    }catch(error){
      console.log(error)
    }
  }

  function changeCharacter(){
    setCharacter(null)
    setOrigin("")
    setAbilities([])
  }

  return (
    <form className='flex flex-col bg-white text-black'
    onSubmit={(e)=>handleSubmit(e)}>
      <h2 className='text-center'>{character ? `Adicionando: ${character.name}` : 'Adicionar herói'}</h2>
      {character ? (
        <span>
          <button type='button'
          onClick={()=>changeCharacter()}>Selecionar outro herói</button>
        </span>
      ):(
        <SearchForm setSelectedCharacter={setCharacter}/>
      )}
      {character && (
        <div className='w-[90%]'>
          <h3>{character.name}</h3>
          <img
          className="object-cover max-w-[400px]"
          alt={`Imagem ilustrativa do personagem da marvel, ${character.name}`}
          src={character.thumbnail}></img>
          <div className='infos'>
            <span>
              <p>Adicione a história de origem</p>
              <textarea 
              value={origin}
              onChange={(e)=>setOrigin(e.target.value)}
              required={true}
              minLength={15}/>
            </span>
            <span>
              <p>Habilidades</p>
              <p>Descreva as habilidades <strong>principais</strong> do herói</p>
              {abilities.length > 0 && (
                <ul className="list-none">
                  {abilities.map(ability => <p key={uuidv4()}>{ability}</p>)}
                </ul>
              )}
              {abilities.length < 5 ? (
                <AddAbility add={saveAbility}/>
              )
            :
            (
              <p>Quantidade máxima de habilidades</p>
            )}
            </span>
          </div>
        </div>
      )}
      <button type="submit">Adicionar herói</button>
    </form>
  )
}