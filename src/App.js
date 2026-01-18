import './App.css';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function App() {

  const navigate = useNavigate();
  
  return (
    <div className="App">
      <header className="App-header">
        <Typography component={'h1'} sx={{ fontSize: '40px', fontWeight: 'bold', color: 'black', }} >Welcome to Homepage</Typography>
        <Button 
          sx={{ 
            width: '200px', 
            border: '2px solid black', 
            borderRadius: '20px', 
            color: 'white', 
            backgroundColor: 'gray',
            '&:hover': {
              backgroundColor: 'lightgray',
              color: "black",
            },
          }}

          onClick={() => navigate('/login')}
        >
          Get Start
        </Button>
      </header>
    </div>
  );
}

export default App;