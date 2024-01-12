import React, { useEffect } from 'react';
import { Grid, Box, Stack, Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useSelector, RootState } from '../../redux/store';
import { getCharacters, getFilms, openFilter } from '../../redux/slices/charactersSlice'
import { CharacterInterface } from '../../interfaces/character'
import CharacterCard from '../../components/CharacterCard';
import Filter from '../../components/Filter';
import Breadcrumbs from '../../components/Breadcrumbs';


const CharactersList: React.FC = () => {

  const { characters} = useSelector((state: RootState) => state.characters);

  useEffect(() => {
    getCharacters();
    getFilms();
  }, [])


  return <Box>
    <Breadcrumbs 
      links={[
        { title: 'Star Wars: Character Explorer' }
      ]}
    />
    <Stack alignItems='flex-end' sx={{ mb: 3 }}>
      <Button 
        startIcon={<FilterListIcon/>} 
        color='primary' 
        variant='contained'
        onClick={() => openFilter(true)}
      >
        Filter
      </Button>
    </Stack>
    <Grid container spacing={2}>
      {!!characters?.count && characters.results.map((character: CharacterInterface) => <Grid key={character.name} item xs={12} md={3}>
        <CharacterCard character={character}/>
      </Grid>)}
    </Grid>
    <Filter/>
  </Box>

}

export default CharactersList;