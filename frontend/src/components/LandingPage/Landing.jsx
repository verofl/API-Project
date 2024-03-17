import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllSpots } from "../../store/spotsReducer";
import "./Landing.css";

const Landing = () => {
  const spots = useSelector((state) => state.spotsState.spots);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  return (
    <div className="spots-container">
      {Object.values(spots).map((spot) => (
        <div key={spot.id} className="spot">
          <div className="tooltip">
            <span className="tooltiptext">{spot.name}</span>
            <img className="image" src={spot.previewImage} />
          </div>
          <div className="info">
            <div className="left">
              <p className="location">{`${spot.city}, ${spot.state}`}</p>
              <p className="price">{`$${spot.price} night`}</p>
            </div>
            <div className="right">
              <p>
                <i className="fa-solid fa-star"></i>
                {` ${spot.avgRating}`}
              </p>
            </div>
          </div>
        </div>
      ))}
      console.log("hello")
    </div>
  );
};

export default Landing;
