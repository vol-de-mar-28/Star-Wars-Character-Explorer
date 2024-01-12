import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';
import { runPreloader } from './preloaderSlice';
import { DataInterface, CharacterInterface } from '../../interfaces/character'

const initialState = {
  characters: {},
  charactersBackup: {},
  films: {},
  isFilterOpened: false,
  filterParams: {
    title: '',
    name: '',
    gender: '',
    maxMass: '',
    minMass: ''
  }
};

const slice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters: (state, action) => ({
      ...state,
      characters: action.payload,
      charactersBackup: action.payload
    }),
    setFilteredCharacters: (state, action) => {
      const { param, value } = action.payload;
      const { results } = state.charactersBackup as DataInterface;
      const filteredCharacters = variants[param](value, results)
      return {
        ...state,
        characters: { ...state.characters, results: filteredCharacters}
      }
    },
    setFilms: (state, action) => ({
      ...state,
      films: action.payload
    }),
    setFilter: (state, action) => ({
      ...state,
      isFilterOpened: action.payload
    }),
    setFilterParams: (state, action) => ({
      ...state,
      filterParams: { ...state.filterParams, ...action.payload }
    }),
    resetFilterParams: (state) => ({
      ...state,
      characters: state.charactersBackup,
      filterParams: {
        title: '',
        name: '',
        gender: '',
        maxMass: '',
        minMass: ''
      }
    })
  }
});

// Reducer
export default slice.reducer;

// Actions
export const {
  setCharacters,
  setFilms,
  setFilter,
  setFilteredCharacters,
  setFilterParams,
  resetFilterParams
} = slice.actions;

export const openFilter = (isOpen: boolean) => {
  dispatch(setFilter(isOpen))
}

export const getCharacters = () => {
  runPreloader(true)
  axios.get('/people')
  .then(res => dispatch(setCharacters(res.data)))
  .catch(err => console.log(err))
  .finally(() => runPreloader(false))
}

export const getFilms = () => {
  axios.get('/films')
  .then(res => dispatch(setFilms(res.data)))
  .catch(err => console.log(err))
}

export const filterCharacter = (param: string, value: string) => {
  dispatch(setFilterParams({[param]: value}))
  dispatch(setFilteredCharacters({param, value}))
}

export const resetFilters = () => {
  dispatch(resetFilterParams())
}

const variants: any = {
  'title': (value: string, characters: CharacterInterface[]) => filterByMovie(value, characters),
  'name': (value: string, characters: CharacterInterface[]) => filterByCharacterName(value, characters),
  'gender': (value: string, characters: CharacterInterface[]) => filterByGender(value, characters),
  'minMass': (value: string, characters: CharacterInterface[]) => filterByMinMass(value, characters),
  'maxMass': (value: string, characters: CharacterInterface[]) => filterByMaxMass(value, characters),
}

const filterByMovie = (value: string, characters: CharacterInterface[]) => 
  characters.filter((character: CharacterInterface) => character.films.includes(value))

const filterByCharacterName = (value: string, characters: CharacterInterface[]) => 
  characters.filter((character: CharacterInterface) => character.name.toLowerCase().includes(value.toLowerCase()))

const filterByGender = (value: string, characters: CharacterInterface[]) => 
  characters.filter((character: CharacterInterface) => character.gender === value)

const filterByMinMass = (value: string, characters: CharacterInterface[]) => 
  characters.filter((character: CharacterInterface) => +character.mass >= +value)

const filterByMaxMass = (value: string, characters: CharacterInterface[]) => 
  characters.filter((character: CharacterInterface) => +character.mass <= +value)