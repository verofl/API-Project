import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton-bonus";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="nav-bar">
      <div className="logo-container">
        <NavLink to="/">
          <img src="/favicon.ico" href="/"></img>
        </NavLink>
        <h1 className="logo-name">MythicalBnB</h1>
      </div>
      <div className="profile-button">
        <div className="spot-link-nav">
          <NavLink className="new-spot-link" to="/spots/new">
            Create a New Spot
          </NavLink>
        </div>
        {isLoaded && <ProfileButton user={sessionUser} />}
      </div>
    </div>
  );
}

export default Navigation;
