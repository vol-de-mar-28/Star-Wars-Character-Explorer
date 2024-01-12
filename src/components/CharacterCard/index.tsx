import React from 'react'
import { Link } from 'react-router-dom';
import { Card, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CharacterInterface } from '../../interfaces/character'
import Image from '../Image';

const StyledCard = styled(Card)({
  padding: '16px',
  background: '#1d1e1f',
  textAlign: 'center',
  'img': {
    marginBottom: '16px',
    maxWidth: '200px'
  }
});

const StyledLink = styled(Link)({
  textDecoration: 'none',
  display: 'block',
  textAlign: 'center',
});

interface Props {
  character: CharacterInterface
}

const CharacterCard: React.FC<Props> = ({ character }: Props) => {

  const characterId = character.url.split('/')[character.url.split('/').length - 2]

  return  <StyledLink to={`/character/${characterId}`}>
    <StyledCard>
      <Image gender={character.gender} name={character.name}/>
      <Typography sx={{ color: '#fff' }}>{character.name}</Typography>
    </StyledCard>
  </StyledLink>

}

export default CharacterCard;