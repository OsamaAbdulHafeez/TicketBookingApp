import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import Home from './pages/home/Home';
import List from './pages/list/List';
import Hotel from './pages/hotels/Hotel';
import { createContext } from 'react';
import Login from './pages/login/Login';
export const ListContext = createContext()
function App() {

  return (
    <ListContext.Provider value={{
      type:"list"
    }}>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/hotels' element={<List />} />
          <Route path='/hotels/:id' element={<Hotel />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </ListContext.Provider>
  )
}

export default App
