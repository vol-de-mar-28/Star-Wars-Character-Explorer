import { Container } from '@mui/material';
import { useSelector, RootState } from './redux/store';
import Routes from './routes'
import Header from './components/Header';
import Loader from './components/Loader';
import './App.css';

function App() {

  const { showPreloader } = useSelector((state: RootState) => state.preloader);
  
  return <>
    <Header />
    <Container sx={{ mb: 5 }}>
      <Routes />
      {showPreloader && <Loader />}
    </Container>
  </>

}

export default App;
