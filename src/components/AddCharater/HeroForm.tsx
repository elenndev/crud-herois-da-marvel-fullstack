import React, { useState } from "react"
import { SearchForm } from "./SearchForm"
import { AddAbility } from "./AddAbility";
import { TypeHero } from "../../types/heroes";
import { addNewHero, updateHero } from "../../utils/fetchAPI";
import { useAppDispatch } from "../../store/storeHooks";
import { addHero, updateExistingHero } from "../../store/heroesStore";
import { v4 as uuidv4 } from "uuid";

export interface selectedHero {
  marvelId: string;
  name: string;
  thumbnail: string;
  _id?: string;
}

interface heroFormProps {
  hero?: TypeHero;
  close: () => void;
}
export const HeroForm = ({hero, close} : heroFormProps) => {
  const [character, setCharacter] = useState<selectedHero|null>(hero ?? null)
  const [origin, setOrigin] = useState(hero?.origins ?? "")
  const [abilities, setAbilities] = useState<string[]>(hero?.abilities ?? [])
  const dispatch = useAppDispatch()

  function saveAbility(newAbility: string){
    const updatedAbilities = [...abilities, newAbility];
    setAbilities(updatedAbilities);
  }

  async function handleSubmit(e: React.FormEvent){
    e.preventDefault()
    if(!character){ return }
    const isEditing = character._id ? true : false

    const newHero: Omit<TypeHero, '_id'> = {
      abilities,
      marvelId: character?.marvelId,
      name: character?.name,
      origins: origin,
      thumbnail: character?.thumbnail
    }
    
    try{
      if(isEditing){
        const updatingHero: TypeHero = {
          _id: character._id!,
          abilities,
          marvelId: character.marvelId,
          name: character.name,
          origins: origin,
          thumbnail: character.thumbnail
        }
        const res = await updateHero(updatingHero);
        if(res.hero){
          dispatch(updateExistingHero(updatingHero))
          close()
        }else{
          throw new Error('Erro na requisição para atualizar o herói')
        }
      }else{
        const res = await addNewHero(newHero)
        if(typeof res == 'string'){
          dispatch(addHero({ ...newHero, _id: res }))
          close()
        } else{
          throw new Error('Erro na requisição para registrar o herói')
        }
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
      <button type="button"
      onClick={()=>close()}
      className="absolute top-0.5 right-0.5 rounded-[2rem] bg-[#000000a8]
      w-fit px-5 py-1 cursor-pointer">
        Fechar
      </button>
      <h2 className='text-center'>{character ? character._id ? `Editando: ${character.name}` :`Adicionando: ${character.name}` : 'Adicionar herói'}</h2>
      {character ? (<>
        {!character._id && (
        <span>
          <button type='button'
          onClick={()=>changeCharacter()}>Selecionar outro herói</button>
        </span>
        )}
      </>):(
        <SearchForm setSelectedCharacter={setCharacter}/>
      )}
      {character && (<>
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
      <button type="submit">{character._id ? 'Salvar alterações' : 'Adicionar herói'}</button>
      </>)}
    </form>
  )
}