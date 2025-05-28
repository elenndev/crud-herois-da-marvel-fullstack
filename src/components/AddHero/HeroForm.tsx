import React, { useState } from "react"
import { SearchHero } from "./SearchHero"
import { SetAbility } from "./SetAbility";
import { TypeHero } from "../../types/heroes";
import { addNewHero, updateHero } from "../../utils/fetchAPI";
import { useAppDispatch } from "../../store/storeHooks";
import { addHero, updateExistingHero } from "../../store/heroesStore";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

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
  const [selectedAbility, setSelectedAbility] = useState<null | string>(null)
  const [error, setError] = useState(false)

  const dispatch = useAppDispatch()

  function saveAbility(newAbility: string){
    const updatedAbilities = [...abilities, newAbility];
    setAbilities(updatedAbilities);
  }

  function removeAbility(ability: string){
    const updatedList = abilities.filter(ab => ab != ability)
    setAbilities(updatedList)
    setSelectedAbility(null)
  }

  async function handleSubmit(e: React.FormEvent){
    e.preventDefault()
    if(!character){ return }

    if(abilities.length < 2){
      setError(true)
      return
    }
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
      toast.error('Erro ao tentar salvar o herói')
    }
  }

  function changeCharacter(){
    setCharacter(null)
    setOrigin("")
    setAbilities([])
  }

  return (
    <form className='flex flex-col bg-white text-black relative rounded-[1em] 
    w-[97%] px-8 py-3 md:px-2 md:w-[60%] items-center custom-shadow'
    onSubmit={(e)=>handleSubmit(e)}>
      <button type="button"
      onClick={()=>close()}
      className="absolute top-1 right-1 rounded-[2rem] btn-danger 
      w-fit px-5 py-1 cursor-pointer text-white">
        Cancelar
      </button>
      <h2 className='text-center w-full md:max-w-[60%]'>{character ? character._id ? `Editando: ${character.name}` :`Adicionando: ${character.name}` : 'Adicionar herói'}</h2>
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
              <p className="text-[#0000009f] text-[0.8 em]">Mínimo de caracteres: 150 - Máximo: 600</p>
              <p className="text-[#0000009f] text-[0.8 em]">
                {origin !="" && `Quantidade atual: ${origin.length} caracteres`}
                </p>
              <textarea
              value={origin}
              onChange={(e)=>setOrigin(e.target.value)}
              required={true}
              minLength={150}
              maxLength={600}
              placeholder={"Historia de origem do herói"}/>
            </span>
            <span className='hero-abilities w-full flex flex-col items-center gap-1'>
              <h3>Habilidades</h3>
              <p>Informe as habilidades <strong>principais</strong> do herói</p>
              {abilities.length > 0 && (<>
              <p className="text-center text-[#0000008f]">Clique em uma das habilidades para editar</p>
                <ul className="list-none gap-2 flex flex-row flex-wrap">
                  {abilities.map(ability => 
                    <li key={uuidv4()}
                    onClick={()=>setSelectedAbility(ability)}
                    className={`${selectedAbility == ability && 'selected'}`}>
                      {ability}
                    </li>)}
                </ul>
              </>)}
              {abilities.length < 5 ? (
                <SetAbility 
                editingAbility={selectedAbility}
                error={error}
                add={saveAbility}
                remove={removeAbility}
                cancel={()=>setSelectedAbility(null)}
                cleanError={()=> setError(false)}/>
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