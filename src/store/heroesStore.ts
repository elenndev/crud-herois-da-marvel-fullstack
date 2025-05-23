import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeHero } from "../types/heroes";

const initialStateValue:TypeHero[] = []

const heroesSlice = createSlice({
  name: 'heroes',
  initialState: {
    value: initialStateValue
  },
  reducers: {
    addHero: (state, action: PayloadAction<TypeHero>) => {
      state.value.push(action.payload)
    },
    setHeroes: (state, action: PayloadAction<TypeHero[]>) => {
      state.value = action.payload
    },
    updateExistingHero: (state, action: PayloadAction<TypeHero>) => {
      state.value = state.value.map(hero=>{
        return hero._id == action.payload._id ? action.payload : hero
      })
    }
  }
})

export const { addHero, setHeroes, updateExistingHero } = heroesSlice.actions

export const store = configureStore({
  reducer: heroesSlice.reducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
