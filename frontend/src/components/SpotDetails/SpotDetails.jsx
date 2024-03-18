import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOneSpot } from "../../store/spotsReducer";
import "./SpotDetails.css";
import { useEffect } from "react";

const SpotDetails = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spotsState);
  const spotData = spot[spotId];
  console.log("SPOT DATA", spotData);

  useEffect(() => {
    dispatch(getOneSpot(spotId));
  }, [spotId, dispatch]);

  return (
    <div className="spot-details">
      {spotData && spotData.name && (
        <>
          <h1>
            Hosted By:{" "}
            {`${spotData.Owner.firstName} ${spotData.Owner.lastName}`}
          </h1>
          <h2 className="details-name">{spotData.name}</h2>
          <h3 className="details-location">{`${spotData.city}, ${spotData.state}, ${spotData.country}`}</h3>
          <div className="details-img-cont">
            <img
              className="image"
              src={spotData.SpotImages[0].url}
              alt="Spot Preview"
            />
            <div className="four-images">
              {spotData.SpotImages.slice(0, 4).map((image, index) => (
                <img key={index} src={image.url} alt={`Image ${index}`} />
              ))}
            </div>
          </div>
          <h2>{spotData.ownerId}</h2>
        </>
      )}
    </div>
  );
};

export default SpotDetails;
