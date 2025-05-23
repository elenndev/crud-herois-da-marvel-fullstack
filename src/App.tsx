import './tailwind.css';
import './App.css';
import useSWR from 'swr';
import { getHeroes } from './utils/fetchAPI';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch  } from './store/storeHooks';
import { setHeroes } from './store/heroesStore';
import { AddCharacter } from './components/AddCharater/AddCharacter';
import { Loader } from './components/Loader';
import { HeroList } from './components/HeroList';

const backendUrl = import.meta.env.VITE_BACKEND_URL

function App() {
  const { data, error, isLoading } = useSWR(`${backendUrl}/heroes`, getHeroes)
  const heroesList = useAppSelector((state)=> state.value)
  const dispatch = useAppDispatch()
  const [openAddHero, setOpenAddHero] = useState(false)

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

  // if(error){
  //   return <p>Is error</p>
  // }


  return (
    <>
      <main
      className='w-screen min-h-screen py-5 relative'>
        <h1 
        className='text-center mt-10'>MARVEL</h1>
        <section className='content w-full h-full'>
          {openAddHero ? (<AddCharacter closeAddCharacter={()=>setOpenAddHero(false)}/>) 
          : 
          (
            <>
            {heroesList.length > 0 ? (<>
              <HeroList list={heroesList}/>
              <button type='button'
              onClick={()=>setOpenAddHero(true)}>Adicionar herói</button>
            </>)
            :
            (
              <span
              className='flex flex-col'>
                <p>Lista vazia, comece adicionando um herói</p>
                <button type='button'
                className='w-fit py-0.5 px-7 bg-red-950 text-white'
                onClick={()=>setOpenAddHero(true)}>
                  Adicionar herói
                </button>
              </span>
            )}
            </>)}
        </section>
      </main>
    </>
  )
}

export default App
