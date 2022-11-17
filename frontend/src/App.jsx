import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';
function App() {

   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [user, setUser] = useState(null);
   const navigate = useNavigate();

   useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
         setIsAuthenticated(true);
      }

      if (isAuthenticated) {
         const user = JSON.parse(localStorage.getItem('user'));
         setUser(user);
         navigate('/dashboard');
      }
      else {
         navigate('/auth');
      }

   }, [isAuthenticated, navigate]);

   return (
      <>
         <Routes>
            <Route path='/dashboard' element={<Dashboard user={user} setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />} />
            <Route path='/auth' element={<Auth setUser={setUser} setIsAuthenticated={setIsAuthenticated} />} />
         </Routes>
      </>
   );
}

export default App;
