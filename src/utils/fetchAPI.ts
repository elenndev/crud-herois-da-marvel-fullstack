import axios from "axios";
import { TypeHero, TypeNewHero } from "../types/heroes";
const backendUrl = import.meta.env.VITE_BACKEND_URL

export const getHeroes = async (url: string) =>{
  const { data } = await axios.get<{message: string; heroes: TypeHero[]}>(url)
  return data.heroes
}

export const addNewHero = async (hero: TypeNewHero) => {
  const { data } = await axios.post<{message: string; _id: string}>(`${backendUrl}/heroes`,{
    marvelId: hero.marvelId,
    name: hero.name,
    abilities: hero.abilities,
    origins: hero.origins,
    thumbnail: hero.thumbnail
  })
  return data._id
}

export const updateHero = async (hero: TypeHero) => {
  const { data } = await axios.put(`${backendUrl}/heroes/${hero._id}`,{
    _id: hero._id,
    marvelId: hero.marvelId,
    name: hero.name,
    abilities: hero.abilities,
    origins: hero.origins,
    thumbnail: hero.thumbnail
  })
  return data
}


export const deleteHero = async (_id: string) => {
  const { data } = await axios.delete<{message: string; deletedStatus: number}>(`${backendUrl}/heroes/${_id}`)
  return data.deletedStatus
}
