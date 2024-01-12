import React from 'react';
import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import logo from '../../images/logo.png';

const HeaderWrapper = styled(Stack)({
  padding: '20px 10px',
  borderBottom: '1px solid #fff',
  marginBottom: '40px',
  background: '#000'
});

const Image = styled('img')({
  maxWidth: '300px',
  width: '100%'
});

const Header: React.FC = () => {

  return <HeaderWrapper direction='row' justifyContent='center'>
    <Image src={logo} alt='Star Wars' />
  </HeaderWrapper>

}

export default Header;