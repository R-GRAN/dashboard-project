import "@/components/Header/Header.scss";
import logo from "@/assets/logo.png";

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="" className="logo" />
      <img src={logo} alt="" className="profile" />

    </header>

  );
}

export default Header;
