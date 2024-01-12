import { useRoutes } from 'react-router-dom';
import CharactersList from '../pages/CharactersList'
import CharacterItem from '../pages/CharacterItem'

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <CharactersList />
    },
    {
      path: '/character/:id',
      element: <CharacterItem />
    }
  ])
}