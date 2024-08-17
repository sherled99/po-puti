import {Routes, Route, useLocation } from 'react-router-dom';
import Gender from "./components/Gender/Gender";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Header from "./components/Header/Header";

export default function App() {
  const location = useLocation();
    let background = location.pathname.replace(/\/\w+$/, '');
    if (background === "/ingredients" || location.pathname === "/send_order"){
      background = "/";
    }

  return (
    <div>
       <Header />
       <Routes location={location?.state?.backgroundLocation && background || location}>
       <Route path="/gender" element={<Gender/>} />
       <Route path="/login" element={<Login/>} />
       <Route path="/register" element={<Register/>} />
       </Routes>
       {location?.state?.backgroundLocation && (
                <Routes location={location}>
                  {/* <Route path="/loginpass/:id" element={<Modal children={<IngredientDetails />} />} /> */}
                </Routes>
              )}
    </div>
  );
}
