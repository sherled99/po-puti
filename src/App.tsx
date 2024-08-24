import { Routes, Route, useLocation } from "react-router-dom";
import Gender from "./components/Gender/Gender";
import Header from "./components/Header/Header";
import MainPage from "./components/Main/MainPage";
import { Modal } from "./components/Modal/Modal";
import Authorization from "./components/Authorization/Authorization";
import VerificationForm from "./components/VerificationForm/VerificationForm";

export default function App() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <div>
      <Header />
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<MainPage />} />
        <Route path="/allGender" element={<Gender />} />
        <Route path="/login" element={<MainPage/>} />
        <Route path="/register" element={<MainPage/>} />
        <Route path="/verification" element={<MainPage/>} />
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/login" element={<Modal children={<Authorization />} />} />
          <Route path="/register" element={<Modal children={<Authorization />} />} />
          <Route path="/verification" element={<Modal children={<VerificationForm />} />} />
        </Routes>
      )}
    </div>
  );
}