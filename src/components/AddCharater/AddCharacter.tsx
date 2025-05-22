import React, { useState } from "react"
import { SearchForm } from "./SearchForm"
import { AddAbility } from "./AddAbility";
import { TypeHero } from "../../types/heroes";

export interface selectedHero {
  marvelId: string;
  name: string;
  thumbnail: string;
}

// interface addCharacterProps {
//   saveHero: (hero: TypeHero) => void;
// }
export const AddCharacter = () => {
  const [character, setCharacter] = useState<selectedHero|null>(null)
  const [origin, setOrigin] = useState("")
  const [abilities, setAbilities] = useState<string[]>([])

  function saveAbility(newAbility: string){
    const updateAbilities = abilities
    updateAbilities.push(newAbility)
    setAbilities(updateAbilities)
  }

  function handleSubmit(e: React.FormEvent){
    e.preventDefault()
    if(!character){ return }

    const newHero: Omit<TypeHero, '_id'> = {
      abilities,
      marvelId: character?.marvelId,
      name: character?.name,
      origins: origin,
      thumbnail: character?.thumbnail
    }
    
    console.log('newHero', newHero)
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
              <input type='text'
              value={origin}
              onChange={(e)=>setOrigin(e.target.value)}/>
            </span>
            <span>
              <p>Habilidades</p>
              <p>Descreva as habilidades <strong>principais</strong> do herói</p>
              {abilities.length > 0 && (
                <ul className="list-none">
                  {abilities.map((ability,index) => <p key={index}>{ability}</p>)}
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