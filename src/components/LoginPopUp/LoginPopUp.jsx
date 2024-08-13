import "@/components/LoginPopUp/LoginPopUp.scss";
import axios from "axios";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { API_ROUTES } from "@/assets/utils/constants";
import { toast, ToastContainer } from "react-toastify";
import { storeInLocalStorage } from "@/assets/utils/function";

function LoginPopUp({ setShowLogin }) {
  const [currState, setCurrentState] = useState("Login");
  const [check, setCheck] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  async function login() {
    try {
      const response = await axios({
        method: "post",
        url: API_ROUTES.LOG_IN,
        data: {
          email,
          password,
        },
      });

      if (response) {
        toast.success("store data");
        storeInLocalStorage(response.data.token, response.data.adminId);
        setShowLogin(false);
      }
    } catch (err) {
      if (err.response) {
        // Le serveur a renvoyé une réponse avec un code d'erreur
        console.error("Erreur de réponse de l'API :", err.response);
        toast.error(err.response.data.message || "Une erreur est survenue lors de la connexion.");
      } else if (err.request) {
        // La requête a été faite, mais aucune réponse n'a été reçue
        console.error("Erreur de requête :", err.request);
        toast.error("Pas de réponse du serveur. Veuillez vérifier votre connexion réseau.");
      } else {
        // Autre type d'erreur (problème dans le code, etc.)
        console.error("Erreur générale :", err.message);
        toast.error("Une erreur s'est produite. Veuillez réessayer.");
      }
    }
  }

  async function signUp() {
    try {
      const response = await axios({
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        url: API_ROUTES.SIGN_UP,
        data: {
          email,
          password,
        },
      });
      if (!response?.data) {
        toast.error(`"Something went wrong during signing up: ", ${response}`);
        return;
      }
      setShowLogin(false);
      toast.success(`Votre compte a bien été créé, vous pouvez vous connecter`);
    } catch (err) {
      toast.error(`Some error occured during signing up: ", ${err}`);
    }
  }

  return (
    <div onClick={() => setShowLogin(false)} className="login-popUp">
      <ToastContainer />
      <form
        onClick={(evt) => {
          evt.stopPropagation();
        }}
        onSubmit={(evt) => {
          evt.preventDefault();
          currState === "Sign Up" ? signUp() : login();
        }}
        className="login-popUp-container"
      >
        <div className="login-popUp-title">
          <h2>
            {currState === "Sign Up" ? "Créez un compte" : "Identifiez vous"}
          </h2>
          <FaXmark onClick={() => setShowLogin(false)} />
        </div>
        <div className="login-popUp-inputs">
          {currState === "Sign Up" && (
            <>
              <label htmlFor="name"></label>
              <input
                type="text"
                name="name"
                placeholder="Votre nom"
                id="name"
                required
              />
            </>
          )}

          <label htmlFor="email"></label>
          <input
            onChange={(evt) => setEmail(evt.target.value)}
            type="email"
            name="email"
            id="email"
            placeholder="Votre email"
            required
          />
          <label htmlFor="password"></label>
          <input
            onChange={(evt) => setPassword(evt.target.value)}
            type={check ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Votre mot de passe"
            required
          />
          <div className="login-popUp-password-check">
            <label htmlFor="checkbox">Voir le mot de passe</label>
            <input
              onChange={() => setCheck(!check)}
              type="checkbox"
              name="checkbox"
              id="checkbox"
            />
          </div>
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Créer un compte" : "Se connecter"}
        </button>
        {currState === "Sign Up" && (
          <div className="login-popUp-condition">
            <label htmlFor=""></label>
            <input type="checkbox" name="" id="" required />
            <p>
              Veuillez accepter les termes d&apos;utilisation de vos données
            </p>
          </div>
        )}

        {currState === "Sign Up" ? (
          <p>
            Déjà un compte ?
            <span onClick={() => setCurrentState("Login")}>
              {" "}
              Connectez vous
            </span>
          </p>
        ) : (
          <p>
            Créer un nouveau compte ?
            <span onClick={() => setCurrentState("Sign Up")}> Cliquez ici</span>
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginPopUp;
