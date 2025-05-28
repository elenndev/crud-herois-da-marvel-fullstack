import axios from "axios"
import md5 from "md5"
import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const publicKey = import.meta.env.VITE_PUBLIC_KEY
const privateKey = import.meta.env.VITE_PRIVATE_KEY

interface heroComicType{
  title: string;
  thumbnail: string
}

interface apiResultType{
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  }
}

export const HeroComics = ({ heroId } : { heroId: string}) => {
  const [loading, setLoading] = useState(true)
  const [comicList, setComicList] = useState<heroComicType[]>([])
  const [error, setError] = useState(false)
  
  useEffect(()=>{
    searchingComics()
    async function searchingComics(){
      const ts = Date.now().toString()
      const hash = md5(ts + privateKey + publicKey)
      const { data } = await axios.get(`https://gateway.marvel.com/v1/public/characters/${heroId}/comics?limit=3&orderBy=-issueNumber&ts=${ts}&apikey=${publicKey}&hash=${hash}`)
      if(data.data.results){
        const formattedResults = data.data.results.map((comic: apiResultType) => {
          const formattedThumbnail = `${comic.thumbnail.path}.${comic.thumbnail.extension}`
          return {
            title: comic.title, 
            thumbnail: formattedThumbnail }
        })
        setComicList(formattedResults)
        setLoading(false)
      } else {
        toast.error("Erro ao tentar buscar os quadrinho do herói")
        setError(true)
      }
    }
  },[heroId])


  return(
  <div className='flex flex-col w-[90%] justify-center items-center'>
    <h4 className='text-center'>Quadrinhos</h4>
    <p>Alguns quadrinhos que contam com a participação do herói</p>
    {loading ? (<>
      Buscando Hqs...</>
    ) : (
    <span className="flex flex-col md:flex-row gap-3 flex-wrap w-[95%] justify-center items-center">
      {comicList.map(comic => (
        <div key={uuidv4()} className="flex flex-col items-center">
          <img
          className='h-[100px] md:h-[200px]'
          alt={`Capa da comic ${comic.title}`}
          height={100}
          width={'auto'}
          src={comic.thumbnail}/>
          <p>{comic.title}</p>
        </div>
      ))}
    </span>)}
    {error && <p className="btn-danger py-1 px-5 rounded-[1em] text-white mb-2">Erro buscar os quadrinhos do herói</p>}
  </div>)
}