import { TypeHero } from "../types/heroes"
import { v4 as uuidv4 } from "uuid";
import { HeroCard } from "./HeroCard";
import { useState } from "react";
import { HeroItem } from "./HeroItem";

interface heroListProps{
  list: TypeHero[];
  openEditHero: (hero: TypeHero) => void;
}
export const HeroList = ({ list, openEditHero } : heroListProps) => {
  const [openHeroCard, setOpenHeroCard] = useState<TypeHero | null>(null)
  return (
    <div className='w-full flex flex-col items-center'>

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
                        openEditHero={openEditHero}
                        close={()=>setOpenHeroCard(null)}/>)}
    </div>
  )
}