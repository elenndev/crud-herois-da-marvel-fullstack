import axios from "axios";
import { TypeHero } from "../types/heroes";

export const getHeroes = async (url: string) =>{
  const { data } = await axios.get<{message: string; heroes: TypeHero[]}>(url)
  return data.heroes
}
