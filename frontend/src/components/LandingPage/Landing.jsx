import Spot from "../Spot/Spot";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllSpots } from "../../store/spotsReducer";
import "./Landing.css";

const Landing = () => {
  const spotsObj = useSelector((state) => state.spotsState);
  const spots = Object.values(spotsObj.spots);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  return (
    <div className="all-spots-container">
      {spots.map((spot) => (
        <Spot data={spot} key={spot.id} className="all-spots-tiles" />
      ))}
    </div>
  );
};

export default Landing;
