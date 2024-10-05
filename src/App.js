import { Route, Routes } from "react-router-dom";
import UserForm from "./components/UserForm";
import Home from "./components/Home";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<UserForm />} />
      </Routes>
    </>
  );
}
