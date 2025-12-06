import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Gender from "./components/Gender/Gender";
import Header from "./components/Header/Header";
import MainPage from "./components/Main/MainPage";
import SearchResultsPage from "./components/SearchResultsPage/SearchResultsPage";
import SearchResultDetailsPage from "./components/SearchResultsPage/SearchResultDetailsPage";
import { Modal } from "./components/Modal/Modal";
import Authorization from "./components/Authorization/Authorization";
import VerificationForm from "./components/VerificationForm/VerificationForm";
import ResetPasswordForm from "./components/ResetPasswordForm/ResetPasswordForm";
import ResetForm from "./components/ResetForm/ResetForm";
import ProfilePage from "./components/Profile/ProfilePage";
import CreateListingPage from "./components/CreateListingPage/CreateListingPage";
import MyCardsPage from "./components/MyCardsPage/MyCardsPage";
import "./App.css";
import "@fontsource/inter";

export default function App() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, location.search]);

  return (
    <div className="App">
      <Header />
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<MainPage />} />
        <Route path="/allGender" element={<Gender />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/search/:id" element={<SearchResultDetailsPage />} />
        <Route path="/create" element={<CreateListingPage />} />
        <Route path="/my-cards" element={<MyCardsPage />} />
        <Route path="/login" element={<MainPage />} />
        <Route path="/register" element={<MainPage />} />
        <Route path="/verification" element={<MainPage />} />
        <Route path="/resetPassword" element={<ResetPasswordForm />} />
        <Route path="/enterResetedPassword" element={<ResetForm />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/login" element={<Modal children={<Authorization />} />} />
          <Route path="/register" element={<Modal children={<Authorization />} />} />
          <Route path="/verification" element={<Modal children={<VerificationForm />} />} />
          <Route path="/resetPassword" element={<Modal children={<ResetPasswordForm />} />} />
          <Route path="/enterResetedPassword" element={<Modal children={<ResetForm />} />} />
        </Routes>
      )}
    </div>
  );
}
