import './App.css';
import AppNav from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserTable from './components/UserTable';
import AddUser from './components/AddUser';

function App() {
  return (
   <>
    <AppNav></AppNav>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<UserTable/>} />
        <Route path="/add" element={<AddUser/>}/>
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
