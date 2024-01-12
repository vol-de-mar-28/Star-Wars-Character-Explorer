import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, RootState } from '../../redux/store';
import { Box, Card, Stack, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getFullData } from '../../redux/slices/characterSlice';
import Image from '../../components/Image';
import Breadcrumbs from '../../components/Breadcrumbs';

const StyledCard = styled(Card)({
  padding: '16px',
  background: '#1d1e1f',
  color: '#fff',
  'img': {
    marginBottom: '16px',
    maxWidth: '300px',
    marginRight: ''
  }
});

const CharacterItem: React.FC = () => {

  const { id } = useParams();
  const { character, starships, species, films } = useSelector((state: RootState) => state.character);
  const [outsideDetails, setOutsideDetails] = useState({
    charactersStarships: [],
    charactersSpecies: [],
    charactersFilms: []
  })

  useEffect(() => {
    if (id) {
      getFullData(id)
    }
  }, [id])

  useEffect(() => {
    const schema = {
      'starships': 'charactersStarships',
      'species': 'charactersSpecies',
      'films': 'charactersFilms'
    }
    const arrays: any = { starships, species, films }
    Object.keys(schema).forEach(key => {
      if (character) {
        const details = arrays[key].filter((a: any) => character[key].includes(a.url))
        setOutsideDetails((prevState: any) => ({
          ...prevState,
          [schema[key as keyof typeof schema]]: details
        }))
      }
    })
  }, [character, starships, species, films])

  const renderOutsideDetails = (key: string) => 
    outsideDetails[key as keyof typeof outsideDetails].map((detail: any, index: number) => <span className='outsideDetail' key={index}>
      {key === 'charactersFilms' ? detail?.title : detail?.name}
      {index !== outsideDetails[key as keyof typeof outsideDetails].length -1 && ', '}
    </span>)

  return <Box>
    <Breadcrumbs 
      links={[
        { title: 'Star Wars: Character Explorer', href: '/' }, 
        { title: character?.name }
      ]}
    />
    <StyledCard>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Image name={character?.name} gender={character?.gender}/>
        </Grid>
        <Grid item xs={12} md={9}>
          <Stack spacing={1}>
            <Typography variant='body1'>Name: {character?.name}</Typography>
            <Typography variant='body1'>Date of birth: {character?.birth_year}</Typography>
            <Typography variant='body1'>Films: {renderOutsideDetails('charactersFilms')}</Typography>
            <Typography variant='body1'>Spaceships: {renderOutsideDetails('charactersStarships')}</Typography>
            <Typography variant='body1'>Species: {renderOutsideDetails('charactersSpecies')}</Typography>
          </Stack>
        </Grid>
      </Grid>
    </StyledCard>
  </Box>

}

export default CharacterItem;