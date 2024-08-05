// import logo from './logo.svg';
import { Route ,Routes} from 'react-router-dom';
import './App.css';
import Login from './components/login';
import Signup from './components/signup';
import Homepage from './components/homepage';
import { Layout } from 'antd';
import Forgot from './components/forgot';
import Postpage from   "././components/postpage"

function App() {
  return (
  <>
  <Routes>
  <Route path ="/" element={<Postpage/>}/>
  <Route path ="/mainpage" element={<Homepage/>}/>
  <Route path ="/forgot" element={<Forgot/>}/>
    <Route path ="/login" element={<Login/>}/>
    <Route path ="/signup" element={<Signup/>}/>
    {/* <Route path ="/layout" element={<Layout/>}/> */}
  </Routes>
  </>
  );
}

export default App;
