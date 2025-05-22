import './tailwind.css';
import './App.css';
import useSWR from 'swr';
import { getHeroes } from './utils/fetchAPI';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch  } from './store/storeHooks';
import { setHeroes } from './store/heroesStore';
import { AddCharacter } from './components/AddCharater/AddCharacter';

const backendUrl = import.meta.env.VITE_BACKEND_URL

function App() {
  const { data, error, isLoading } = useSWR(`${backendUrl}/heroes`, getHeroes)
  const heroesList = useAppSelector((state)=> state.value)
  const dispatch = useAppDispatch()

  useEffect(()=>{
    if(data){
      dispatch(setHeroes(data))
    }
  },[data, dispatch])

  // if(isLoading){
  //   return <p>Is loading</p>
  // }

  // if(error){
  //   return <p>Is error</p>
  // }


  return (
    <>
      <main>
        <h1 className='text-center'>MARVEL</h1>
        <p>normal text</p>
        {heroesList.length > 0 && (<>
          {heroesList.map((dt, i) => (<p key={i}>{dt.name}</p>))}
        </>)}
        <AddCharacter/>
      </main>
    </>
  )
}

export default App
