import React from 'react';
import { Link } from 'react-router-dom'
import { Box, Breadcrumbs as MuiBreadcrumbs, Typography } from '@mui/material';

interface Props {
  links: LinkInterface[]
}

interface LinkInterface {
  title: string;
  href?: string
}

const Breadcrumbs: React.FC<Props> = ({ links }: Props) => {

  return <Box sx={{ mb: 5 }}>
    <MuiBreadcrumbs sx={{ color: '#fff' }}>
      {links.map((link: LinkInterface, index: number) => 
        link.href ? 
        <Link style={{ color: '#fff' }} key={index} to={link.href}>{link.title}</Link> : 
        <Typography key={index}>{link.title}</Typography>)}
    </MuiBreadcrumbs>
  </Box>

}

export default Breadcrumbs;