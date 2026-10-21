import { useNavigate } from "react-router";
import { removeToken } from "../utils/tokenUtils";

const Navbar = () => {
  const navigate = useNavigate();

  function handleLogout() {
    console.log("logging out")
    removeToken();
    navigate("/login", {replace: true})
  }
    return (<button onClick={handleLogout}>Log out</button>)
}

export default Navbar