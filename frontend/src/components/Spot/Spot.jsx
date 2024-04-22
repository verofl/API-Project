import { useNavigate } from "react-router-dom";
import "./Spot.css";
// import { DeleteSpot } from "../DeleteSpot/DeleteSpot";
// import UpdateSpot from "../UpdateSpot/UpdateSpot";
import { DeleteSpot } from "../DeleteSpot/DeleteSpot";
import OpenModalButton from "../OpenModalButton";

const Spot = ({ data, isManagePage }) => {
  const navigate = useNavigate();
  const { id, name, previewImage, state, city, price, avgRating } = data;
  // const pageUrl = window.location.href.split("/");
  // const currentWord = pageUrl.slice(-1);
  // console.log(pageUrl.slice(-1));
  // if (currentWord[0] === "current") console.log("Yay it worked");
  const createRedirect = () => {
    navigate(`/spots/${id}/update`);
  };

  return (
    <div className="spots-container">
      <div key={id} className="spot">
        <div className="tooltip">
          <span className="tooltiptext">{name}</span>
          <img
            className="image"
            src={previewImage}
            onClick={() => navigate(`/spots/${id}`)}
          />
        </div>
        <div className="info">
          <div className="left">
            <p className="location">{`${city}, ${state}`}</p>
            <p className="price">{`$${price} night`}</p>
          </div>
          <div className="right">
            <p>
              <i className="fa-solid fa-star"></i>
              {` ${avgRating}`}
            </p>
          </div>
        </div>
        {isManagePage && (
          <div className="manage-buttons">
            <button className="update-button" onClick={createRedirect}>
              Update
            </button>
            <OpenModalButton
              buttonText="Delete"
              modalComponent={<DeleteSpot spot={data} />}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Spot;
