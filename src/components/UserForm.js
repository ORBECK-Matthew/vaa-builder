import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../contexts/AuthProvider";
import "react-toastify/dist/ReactToastify.css";

function UserForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginAction } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.length > 0 && password.length > 0) {
      loginAction({ username, password }).catch(() =>
        toast.error("Erreur lors de la connexion!")
      );
    } else {
      toast.error("Veuillez remplir tous les champs !");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <ToastContainer />
      <h1>LCVCK Tournament</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Pseudo
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Pseudo"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Mot de passe
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Se connecter
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
