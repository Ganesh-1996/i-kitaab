import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import About from './Components/About';
import Home from './Components/Home';
import ContextEle from './Context/ContextEle';
import Login from './Components/Login';
import Signup from './Components/Signup';

function App() {
  return (
    <ContextEle>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
    </Routes>
    </BrowserRouter>
    </ContextEle>

  )
}

export default App;
