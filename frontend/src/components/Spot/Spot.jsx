import { useNavigate } from "react-router-dom";
import "./Spot.css";

const Spot = ({ data }) => {
  const navigate = useNavigate();
  const { id, name, previewImage, state, city, price, avgRating } = data;

  return (
    <div className="spots-container" onClick={() => navigate(`/spots/${id}`)}>
      <div key={id} className="spot">
        <div className="tooltip">
          <span className="tooltiptext">{name}</span>
          <img className="image" src={previewImage} />
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
      </div>
    </div>
  );
};

export default Spot;
