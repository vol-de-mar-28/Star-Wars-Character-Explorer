import React from 'react';
import {
  Drawer,
  Stack,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button
} from '@mui/material'
import { RootState, useSelector } from '../../redux/store';
import { openFilter, filterCharacter, resetFilters } from '../../redux/slices/charactersSlice';
import { MovieInterface } from '../../interfaces/movie'

interface Option {
  title: string,
  url: string
}

// interface FilterParams {
//   title: string,
//   name: string,
//   gender: string,
//   maxMass: string,
//   minMass: string
// }

const Filter: React.FC = () => {

  const { isFilterOpened, filterParams, films } = useSelector((state: RootState) => state.characters);

  const options = films?.results?.map((movie: MovieInterface) => ({
    title: movie.title,
    url:  movie.url
  }))

  return <Drawer
    anchor="right"
    open={isFilterOpened}
    onClose={() => openFilter(false)}
  >
    <Stack sx={{ padding: 2, minWidth: '300px' }} spacing={2}>
      {!!options?.length && <FormControl fullWidth>
        <InputLabel id='movie-select'>Movie</InputLabel>
        <Select
          labelId='movie-select'
          id='movie-select'
          value={filterParams.title}
          label='Movie'
          onChange={e => filterCharacter('title', e.target.value)}
        >
          {options.map((option: Option) => <MenuItem key={option.title} value={option.url}>{option.title}</MenuItem>)}
        </Select>
      </FormControl>}
      <TextField
        label="Name"
        type="text"
        value={filterParams.name}
        onChange={e => filterCharacter('name', e.target.value)}
      />
      <FormControl>
        <FormLabel id="gender-radio-group">Gender</FormLabel>
        <RadioGroup
          aria-labelledby="gender-radio-group"
          defaultValue=""
          name="radio-buttons-group"
          value={filterParams.gender}
          onChange={e => filterCharacter('gender', e.target.value)}
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
        </RadioGroup>
      </FormControl>
      <TextField
        label="Min mass"
        type="number"
        value={filterParams.minMass}
        onChange={e => filterCharacter('minMass', e.target.value)}
      />
      <TextField
        label="Max mass"
        type="number"
        value={filterParams.maxMass}
        onChange={e => filterCharacter('maxMass', e.target.value)}
      />
      <Button color='error' variant='contained' onClick={resetFilters}>Reset</Button>
    </Stack>
  </Drawer>

}

export default Filter;