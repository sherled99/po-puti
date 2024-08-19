import { Routes, Route, useLocation } from "react-router-dom";
import Gender from "./components/Gender/Gender";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Header from "./components/Header/Header";
import { Modal } from "./components/Modal/Modal";
import Authorization from "./components/Authorization/Authorization";

export default function App() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  console.log('Location:', location);
  console.log('State:', state);

  return (
    <div>
      <Header />
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Gender />} />
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/login" element={<Modal children={<Authorization />} />} />
        </Routes>
      )}
    </div>
  );
}