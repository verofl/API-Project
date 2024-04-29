import Spot from "../Spot/Spot";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserSpots } from "../../store/spotsReducer";
import { useNavigate } from "react-router-dom";
import "./ManageSpots.css";

const ManageSpots = () => {
  const spotsObj = useSelector((state) => state.spotsState);
  const spots = Object.values(spotsObj.spots);

  // console.log("SPOTS DATA HERE ====>", spots);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getSpots = async () => {
      try {
        await dispatch(getUserSpots());
      } catch (error) {
        console.error("Error fetching spots");
      }
    };
    getSpots();
  }, [dispatch]);

  const createRedirect = () => {
    navigate("/spots/new");
  };

  let hasSpots = true;

  if (!spots || !spots.length) {
    hasSpots = false;
  }

  return (
    <>
      <div className="manage-container">
        <h1 className="manage-header">Manage Spots</h1>
        <button className="create-spot-bttn" onClick={() => createRedirect()}>
          Create a New Spot
        </button>
      </div>
      {hasSpots ? (
        <div className="all-spots-container">
          {spots.map((spot) => (
            <Spot
              data={spot}
              key={spot.id}
              className="all-spots-tiles"
              isManagePage={true}
            />
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default ManageSpots;
