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
          {/* <img className="image" src={spot.previewImage} /> */}
          <img className="image" src={spot.previewImage} />
          <div className="info">
            <p className="name">{spot.name}</p>
            <p className="price">{`$${spot.price}/night`}</p>
            <p>
              <i class="fa-solid fa-star"></i>
              {spot.avgRating}
            </p>
          </div>
        </div>
      ))}
      {/* console.log("hello") */}
    </div>
  );
};

export default Landing;
