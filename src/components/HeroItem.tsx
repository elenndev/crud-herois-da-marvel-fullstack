import { useState } from "react";
import { TypeHero } from "../types/heroes";
import { ModalDeleteHero } from "./ModalDeleteHero";
import { deleteHero } from "../utils/fetchAPI";
import { useAppDispatch } from "../store/storeHooks";
import { removeHero } from "../store/heroesStore";
import { Loader } from "./Loader";
import { toast } from "react-toastify";
import { HeroComics } from "./HeroComics";

interface heroItemProps {
  hero: TypeHero;
  close: ()=> void;
  openEditHero: (hero: TypeHero) => void;
}
export const HeroItem = ({ hero, close, openEditHero } : heroItemProps ) => {
  const [modalConfirmDelete, setModalConfirmDelete] = useState(false)
  const [ loadingDelete, setLoadingDelete ] = useState(false)
  const dispatch = useAppDispatch()

  async function handleDeleteHero(){
    setLoadingDelete(true)
    const req = await deleteHero(hero._id)
    if(req == 200){
      dispatch(removeHero(hero._id))
      close()
    } else{
      toast.error("Erro ao tentar deletar o herói")
    }
  }

  return (
    <div
    className={`flex w-[90%] h-[600px] min-h-fit py-1 md:py-0 md:w-[80%] rounded-[1em] 
    flex-col md:flex-row items-center justify-center relative ${!loadingDelete && 'custom-shadow bg-white'}`}>
    {loadingDelete ? (
      <Loader loadingText="Deletando herói, aguarde um momento..."/>
      ) : (<>
      <img 
      alt={`Imagem ilustrativa do personagem da marvel ${hero.name}`} 
      width='auto'
      className="h-[250px] w-full md:h-full md:min-h-[400px] md:w-[35%] object-contain md:object-cover"
      src={hero.thumbnail}/>

      <button type="button"
      onClick={()=>close()}
      className="absolute top-0.5 right-0.5 rounded-[2rem] bg-[#000000a8]
      w-fit px-5 py-1 cursor-pointer">
        Fechar
      </button>

      <span className='infos flex- flex-col md:py-3 w-full h-full mb-3 rounded-[1em]  text-black relative'>
        {modalConfirmDelete && (<ModalDeleteHero cancel={()=>setModalConfirmDelete(false)}
                                  confirm={handleDeleteHero}/>)}
        <h3 className="text-center">
          {hero.name}
        </h3>
        <span className="hero-info flex flex-col items-center">
          <h4 className='text-center'>Origem do herói</h4>
          <p className="px-2">{hero.origins}</p>
          <h4 className='text-center mb-2'>Habilidades</h4>
          <ul className='hero-item-abilitites list-none mb-3'>
            {hero.abilities.map((abilitie, index) => <li key={index}>{abilitie}</li>)}
          </ul>
        <HeroComics heroId={hero.marvelId}/>
        </span>
        <span className='hero-actions flex justify-center items-center flex-wrap gap-3'>
          <button 
          type='button'
          className='btn-yellow text-white py-1 px-9 rounded-[3rem]'
          onClick={()=>{openEditHero(hero);close()}}>Editar</button>
          <button 
          type='button'
          className='btn-danger text-white py-1 px-9 rounded-[3rem]'
          onClick={()=>setModalConfirmDelete(true)}>
            Deletar
          </button>
        </span>
      </span>
    </>)}
    </div>
  )
}