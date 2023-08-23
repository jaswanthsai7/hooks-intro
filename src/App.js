import "./App.css";
import Ingredients from "./components/ingredients/Ingredients";
import Auth from "./Auth.js";
import { AuthContext } from "./context/auth-context";
import { useContext } from "react";

function App(props) {
  const authContext = useContext(AuthContext);

  let content = <Auth />;
  if (authContext.isAuth) {
    content = <Ingredients />;
  }
  return content;
}

export default App;
