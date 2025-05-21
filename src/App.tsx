import './tailwind.css';
import './App.css';
import useSWR from 'swr';
import { getHeroes } from './utils/fetchAPI';

const backendUrl = import.meta.env.VITE_BACKEND_URL

function App() {
  const { data, error, isLoading } = useSWR(`${backendUrl}/heroes`, getHeroes)

  if(isLoading){
    return <p>Is loading</p>
  }

  if(error){
    return <p>Is error</p>
  }

  return (
    <>
      <main>
        <h1 className='text-center'>MARVEL</h1>
        <p>normla text</p>
        {data && (<>
          {data.map((dt, i) => (<p key={i}>{dt.name}</p>))}
        </>)}
      </main>
    </>
  )
}

export default App
