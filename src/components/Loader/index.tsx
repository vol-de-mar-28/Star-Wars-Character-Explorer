import React from 'react';
import { LinearProgress, Stack, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import logo from '../../images/logo.png';

const StyledStack = styled(Stack)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: '#000',
  alignItems: 'center',
  justifyContent: 'center',
  'img': {
    maxWidth: '200px'
  }
});

const Loader: React.FC = () => {

  return <StyledStack spacing={3}>
    <img src={logo} alt='Star Wars' />
    <Container>
      <LinearProgress/>
    </Container>
  </StyledStack>

}

export default Loader;