import React, { useState } from "react"
import { SearchHero } from "./SearchHero"
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
    <form className='flex flex-col bg-white text-black relative
    w-fit px-8 py-3 md:px-2 md:w-[60%] items-center custom-shadow'
    onSubmit={(e)=>handleSubmit(e)}>
      <button type="button"
      onClick={()=>close()}
      className="absolute top-1 right-1 rounded-[2rem] btn-danger 
      w-fit px-5 py-1 cursor-pointer">
        Cancelar
      </button>
      <h2 className='text-center max-w-[60%]'>{character ? character._id ? `Editando: ${character.name}` :`Adicionando: ${character.name}` : 'Adicionar herói'}</h2>
      {character ? (<>
        {!character._id && (
        <span>
          <button type='button'
          className='btn-blue py-1 px-5 rounded-[3rem] mb-2'
          onClick={()=>changeCharacter()}>Selecionar outro herói</button>
        </span>
        )}
      </>):(
        <SearchHero setSelectedCharacter={setCharacter}/>
      )}
      {character && (<>
        <div className='flex w-full flex-col items-center'>
          <img
          className="h-[250px] object-cover"
          alt={`Imagem ilustrativa do personagem da marvel, ${character.name}`}
          width='auto'
          src={character.thumbnail}></img>
          <div className='infos'>
            <span className='hero-origin w-full flex flex-col items-center'>
              <h3>Adicione a história de origem</h3>
              <textarea
              value={origin}
              onChange={(e)=>setOrigin(e.target.value)}
              required={true}
              minLength={15}
              placeholder={"Historia de origem do herói"}/>
            </span>
            <span className='hero-abilities w-full flex flex-col items-center gap-1'>
              <h3>Habilidades</h3>
              <p>Informe as habilidades <strong>principais</strong> do herói</p>
              {abilities.length > 0 && (
                <ul className="list-none gap-2 flex flex-row flex-wrap">
                  {abilities.map(ability => <li key={uuidv4()}>{ability}</li>)}
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
      <button 
      type="submit"
      className="btn-blue mt-3 py-0.5 px-5 rounded-[3rem] text-[1.5em]">
        {character._id ? 'Salvar alterações' : 'Adicionar herói'}
      </button>
      </>)}
    </form>
  )
}