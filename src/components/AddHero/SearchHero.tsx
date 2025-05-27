import axios from "axios"
import { useEffect, useState } from "react"
import md5 from "md5";
import { selectedHero } from "./HeroForm";
import { v4 as uuidv4 } from "uuid";

const publicKey = import.meta.env.VITE_PUBLIC_KEY
const privateKey = import.meta.env.VITE_PRIVATE_KEY

interface apiResults {
  id: string;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  }
}

interface searchFormProps {
  setSelectedCharacter: (hero: selectedHero) => void;
}
export const SearchHero = ({ setSelectedCharacter } : searchFormProps) =>{
  const [searchCharacter, setSearchCharacter] = useState("")
  const [results, setResults] = useState<selectedHero[]>([])

  useEffect(()=>{
    if (!searchCharacter.trim()) return 

    const handleSearch = setTimeout(()=>{
      fetchCaracters(searchCharacter)
    }, 500)

    return ()=> clearTimeout(handleSearch)

  },[searchCharacter])
  
  async function fetchCaracters(name: string){
    const ts = Date.now().toString()
    const hash = md5(ts + privateKey + publicKey)
    const url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${name}&limit=10&ts=${ts}&apikey=${publicKey}&hash=${hash}`

    try{
      const { data } = await axios.get(url)
      if(data){
        const resultsList: selectedHero[] = data.data.results.map( (ch: apiResults) => ({
          marvelId: ch.id,
          name: ch.name,
          thumbnail: `${ch.thumbnail.path}.${ch.thumbnail.extension}`
        }))
        setResults(resultsList)
      }
    }catch(error){
      console.log(error)
    }

  }

  return (
    <span className="flex flex-col gap-1">
      <h3 className='text-center'>Pesquisar heróis</h3>
      <p>Dica: Pesquise pelo nome do herói em inglês, <span className="text-[#0000008f] block">Exemplo: Spider-Man</span></p>
      <input type="text" 
      value={searchCharacter} 
      onChange={(e)=>setSearchCharacter(e.target.value)}
      placeholder='Pesquisar nome do herói'
      className='input-search-character'/>
      <ul className="search-hero-results list-none">
        <li>
          <p>Resultados</p>
        </li>
        {results.length == 0 ? 
        (
          <li className='text-[#0000008f]'><p>Digite o nome de um herói para pesquisar</p></li>
        )
        :
        (results.map(ch => 
          <li key={uuidv4()} 
          onClick={()=> setSelectedCharacter(ch)}>
            {ch.name}
          </li>))}
      </ul>
    </span>
  )
  
}