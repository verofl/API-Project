import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./SpotDetails.css";

export default function SpotDetails() {
  const spots = useSelector((state) => state.spotsState.spots);
  const { spotId } = useParams();
  const spotData = spots[spotId];
  console.log("SPOT DATA", spotData);

  return (
    <div className="spot-details">
      {/* <Spot data={spotData} /> */}
      <img className="image" src={spotData.previewImage} />
      <h2>{spotData.ownerId}</h2>
    </div>
  );
}
