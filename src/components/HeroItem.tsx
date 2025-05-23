import { useState } from "react";
import { TypeHero } from "../types/heroes";

interface heroItemProps {
  hero: TypeHero;
  close: ()=> void;
  openEditHero: (hero: TypeHero) => void;
}
export const HeroItem = ({ hero, close, openEditHero } : heroItemProps ) => {
  const [modalConfirmDelete, setModalConfirmDelete] = useState(false)
  return (
    <div
    className="border flex w-[90%] md:w-[80%] 
    flex-col md:flex-row relative">
      <img 
      alt={`Imagem ilustrativa do personagem da marvel ${hero.name}`} 
      width='auto'
      className="h-[250px] md:min-h-full md:h-[400px] md:w-[30%] object-contain md:object-cover"
      src={hero.thumbnail}/>

      <button type="button"
      onClick={()=>close()}
      className="absolute top-0.5 right-0.5 rounded-[2rem] bg-[#000000a8]
      w-fit px-5 py-1 cursor-pointer">
        Fechar
      </button>

      <span className='infos w-full bg-white text-black'>
        <h3
        className="text-center">
          {hero.name}
        </h3>
        <span className="hero-info flex flex-col items-center">
          <h4 className='text-center'>Origem do herói</h4>
          <p>{hero.origins}</p>
          <h4 className='text-center'>Habilidades</h4>
          <ul className='list-none'>
            {hero.abilities.map((abilitie, index) => <li key={index}>{abilitie}</li>)}
          </ul>
        </span>
        <span className='hero-actions flex justify-center items-center flex-wrap gap-3'>
          <button 
          type='button'
          className='bg-yellow-300 text-white py-1 px-9 rounded-[3rem]'
          onClick={()=>{openEditHero(hero);close()}}>Editar</button>
          <button 
          type='button'
          className='bg-red-500 text-white py-1 px-9 rounded-[3rem]'>Deletar</button>
        </span>
      </span>
    </div>
  )
}