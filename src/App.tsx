import './tailwind.css';
import './App.css';
import useSWR from 'swr';
import { getHeroes } from './utils/fetchAPI';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch  } from './store/storeHooks';
import { setHeroes } from './store/heroesStore';
import { HeroForm } from './components/AddCharater/HeroForm';
import { Loader } from './components/Loader';
import { HeroList } from './components/HeroList';
import { TypeHero } from './types/heroes';
import { ToastContainer, toast } from 'react-toastify';

const backendUrl = import.meta.env.VITE_BACKEND_URL

function App() {
  const { data, error, isLoading } = useSWR(`${backendUrl}/heroes`, getHeroes)
  const heroesList = useAppSelector((state)=> state.value)
  const dispatch = useAppDispatch()
  const [openAddHero, setOpenAddHero] = useState(false)
  const [editHero, setEditHero] = useState<undefined | TypeHero>(undefined)
  const [showList, setShowList] = useState(false)

  useEffect(()=>{
    if(data){
      dispatch(setHeroes(data))
    }
  },[data, dispatch])

  if(isLoading){
    return (
    <main 
    className='w-screen h-screen flex justify-center items-center relative'>
      <Loader/>
    </main>
    )
  }

  function openHeroForm(hero?: TypeHero){
    setOpenAddHero(true)
    hero && setEditHero(hero)
  }

  function closeAddOrEditHero(){
    setEditHero(undefined)
    setOpenAddHero(false)
  }

  if(error){
    toast.error("Erro ao tentar buscar dados no servidor")
  }


  return (
    <>
      <main
      className='w-screen min-h-screen relative'>
        <ToastContainer />
        {showList ? (<>
          <h1 className='text-center mt-10'>MARVEL</h1>
          <section className='content w-full h-full flex flex-col items-center py-5'>
            {openAddHero ? (
              <HeroForm 
              hero={editHero} 
              close={closeAddOrEditHero}/>) 
            : 
            (
              <>
              {heroesList.length > 0 ? (<>
                <HeroList 
                openHeroForm={openHeroForm}
                list={heroesList}/>
                
              </>)
              :
              (
                <span
                className='flex flex-col items-center'>
                  <h2 className='font-light'>Lista vazia, comece adicionando um herói</h2>
                  <button type='button'
                  className='w-fit py-0.5 px-10 bg-[#5b0505af] text-white text-[1.5em] rounded-[1.5rem]'
                  onClick={()=>setOpenAddHero(true)}>
                    Adicionar herói
                  </button>
                </span>
              )}
              </>)}
          </section>
        </>):(
          <span className='w-full h-screen flex flex-col items-center justify-center'>
            <h1 className='main-title'>MARVEL</h1>
            <button type='button'
              className='open-hero-list w-fit px-12 bg-[#5b0505af] text-white rounded-[2rem] relative'
              onClick={()=>setShowList(true)}>
                <p className=''>Conferir Lista de heróis</p>
            </button>
          </span>
        )}
      </main>
    </>
  )
}

export default App
