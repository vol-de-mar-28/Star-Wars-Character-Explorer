import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';
import { runPreloader } from './preloaderSlice';

const initialState = {
  character: null,
  starships: null,
  species: null,
  films: null
};

const slice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setCharacter: (state, action) => ({
      ...state,
      character: action.payload
    }),
    setStarships: (state, action) => ({
      ...state,
      starships: action.payload
    }),
    setSpecies: (state, action) => ({
      ...state,
      species: action.payload
    }),
    setFilms: (state, action) => ({
      ...state,
      films: action.payload
    })
  }
});

// Reducer
export default slice.reducer;

// Actions
export const {
  setCharacter,
  setSpecies,
  setStarships,
  setFilms
} = slice.actions;

export const getFullData = (id: string) => {
  runPreloader(true);
  const requests = [`/people/${id}`, '/films', '/species', 'starships']
  const axiosArr = requests.map(req => axios.get(req))
  Promise.all(axiosArr)
  .then(res => {
    dispatch(setCharacter(res[0].data))
    dispatch(setFilms(res[1].data.results))
    dispatch(setSpecies(res[2].data.results))
    dispatch(setStarships(res[3].data.results))
  })
  .catch(err => console.log(err))
  .finally(() => runPreloader(false))
}