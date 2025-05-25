import { CSSProperties } from "react";
import { TypeHero } from "../types/heroes";

interface heroCardProps {
  hero: TypeHero;
  openCard: (selectHero: TypeHero) => void;
}

export const HeroCard = ({ hero, openCard } : heroCardProps) => {
  const thumbnailStyle: CSSProperties = {
    backgroundImage: `url(${hero.thumbnail})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '300px',
  }

  return(
    <div
    className='w-[25%] flex flex-col cursor-pointer gap-2'
    onClick={()=> openCard(hero)}>
      <span className='thumbnail'
      aria-label={`Thumbnail com imagem ilustrativa do personagem ${hero.name}`}
      style={thumbnailStyle}></span>
      <p className="text-center">{hero.name}</p>
    </div>
  )
}