import Spot from "../Spot/Spot";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserSpots } from "../../store/spotsReducer";
import { useNavigate } from "react-router-dom";
import "./ManageSpots.css";

const ManageSpots = () => {
  const spotsObj = useSelector((state) => state.spotsState);
  const spots = Object.values(spotsObj.spots);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserSpots());
  }, [dispatch]);

  const createRedirect = () => {
    navigate("/spots/new");
  };

  return (
    <>
      <div className="manage-container">
        <h1 className="manage-header">Manage Spots</h1>
        <button className="create-spot-bttn" onClick={() => createRedirect()}>
          Create a New Spot
        </button>
      </div>
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
    </>
  );
};

export default ManageSpots;
