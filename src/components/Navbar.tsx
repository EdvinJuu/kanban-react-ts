import { useNavigate } from "react-router";
import { removeToken } from "../utils/tokenUtils";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { setTheme } = useTheme();

  function handleLogout() {
    console.log("logging out");
    removeToken();
    navigate("/login", { replace: true });
  }

  const themeIconSize = "4";

  return (
    <header className={`flex justify-between items-center p-2 bg-secondary`} >
      <h1 className={`text-text`}>Your task board</h1>
      <div className="flex gap-4">
        <div className="grid grid-cols-3 gap-0.5 w-15">
          <button
            className={`w-${themeIconSize} h-${themeIconSize} bg-[#7dc7c7] rounded-full border`}
            onClick={() => setTheme("cyanic")}
          />
          <button
            className={`w-${themeIconSize} h-${themeIconSize} bg-[#b97676] rounded-full border`}
            onClick={() => setTheme("scarlet")}
          />
          <button
            className={`w-${themeIconSize} h-${themeIconSize} bg-[#8f79ba] rounded-full border`}
            onClick={() => setTheme("lavender")}
          />
          <button
            className={`w-${themeIconSize} h-${themeIconSize} bg-[#9dc873] rounded-full border`}
            onClick={() => setTheme("jungle")}
          />
          <button
            className={`w-${themeIconSize} h-${themeIconSize} bg-[#ffffff] rounded-full border`}
            onClick={() => setTheme("light")}
          />
          <button
            className={`w-${themeIconSize} h-${themeIconSize} bg-[#333333] rounded-full border`}
            onClick={() => setTheme("dark")}
          />
        </div>
        <button className="text-text" onClick={handleLogout}>Log out</button>
      </div>
    </header>
  );
};

export default Navbar;
