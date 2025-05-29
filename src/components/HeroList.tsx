import { TypeHero } from "../types/heroes"
import { v4 as uuidv4 } from "uuid";
import { HeroCard } from "./HeroCard";
import { useState } from "react";
import { HeroItem } from "./HeroItem";

interface heroListProps{
  list: TypeHero[];
  openHeroForm: (hero?: TypeHero) => void;
  openAddHero: () => void;
}
export const HeroList = ({ list, openHeroForm, openAddHero } : heroListProps) => {
  const [openHeroCard, setOpenHeroCard] = useState<TypeHero | null>(null)
  return (<>
    <div className='hero-list w-full flex flex-col gap-5 items-center'>
      {list.length > 0 ? (<>
        <h2 className={`text-center ${openHeroCard && 'hidden'}`}>Lista de Heróis</h2>
        <div
        className={`${openHeroCard && 'hidden'} w-full flex flex-row flex-wrap gap-5 items-center justify-center`}>
          {list.map(hero => (
            <HeroCard 
            key={uuidv4()} 
            hero={hero}
            openCard={setOpenHeroCard}/>))}
        </div>
        {openHeroCard && (<HeroItem
                          hero={openHeroCard} 
                          openEditHero={openHeroForm}
                          close={()=>setOpenHeroCard(null)}/>)
        }
        <button type='button'
        onClick={()=>openHeroForm()}
        className={`${openHeroCard && ('hidden')} btn-yellow py-1 px-3 rounded-[3rem]`}>
          Adicionar herói
        </button>
      </>) : (<>
        <h2 className='no-items font-light text-center'>Lista vazia, comece adicionando um herói</h2>
        <button type='button'
        className='w-fit py-0.5 px-10 bg-[#5b0505af] text-white text-[1.5em] rounded-[1.5rem]'
        onClick={openAddHero}>
          Adicionar herói
        </button>
      </>)}
    </div>
  </>)
}