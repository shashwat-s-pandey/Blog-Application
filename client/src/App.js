import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element= {<Home/>} />
        <Route path='/blog/search' element={<Home/>}></Route>
        <Route path='/signin' element= {<Signin/>} />
        <Route path='/signup' element= {<Signup/>} />
      </Routes>
    </div>
  );
}

export default App;
