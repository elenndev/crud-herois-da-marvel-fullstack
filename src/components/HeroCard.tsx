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
    borderRadius: '15px',
  }

  return(
    <div
    className='hero-card w-[70%] md:w-[25%] flex flex-col cursor-pointer gap-2 rounded-[15px]'
    onClick={()=> openCard(hero)}>
      <span className='thumbnail'
      aria-label={`Thumbnail com imagem ilustrativa do personagem ${hero.name}`}
      style={thumbnailStyle}></span>
      <p className="text-center py-2">{hero.name}</p>
    </div>
  )
}