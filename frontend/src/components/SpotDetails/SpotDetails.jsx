import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneSpot } from "../../store/spotsReducer";
import Reviews from "../Reviews/Reviews";
import "./SpotDetails.css";

const SpotDetails = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spotsState);
  const spotData = spot[spotId];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpotData = async () => {
      setLoading(true);
      await dispatch(getOneSpot(spotId));
      setLoading(false);
    };
    fetchSpotData();
  }, [dispatch, spotId]);

  // console.log("SPOT DATA ======>", spotData);
  if (loading || !spotData || !spotData.SpotImages || !spotData.Owner) {
    return <div>Loading...</div>;
  }

  return (
    <div className="spot-details-container">
      <h2 className="details-name">{spotData.name}</h2>
      <h3 className="details-location">{`${spotData.city}, ${spotData.state}, ${spotData.country}`}</h3>
      <div className="details-img-cont">
        <img
          className="image"
          src={spotData?.SpotImages[0]?.url}
          alt="Spot Preview"
        />
        <div className="four-images">
          {spotData.SpotImages?.slice(1, 5).map((image, index) => (
            <img
              className="small-images"
              key={index}
              src={image.url}
              alt={`Image ${index}`}
            />
          ))}
        </div>
      </div>
      <div className="detail-info">
        <div className="details-left">
          <h1>
            Hosted By:{" "}
            {`${spotData.Owner.firstName} ${spotData.Owner.lastName}`}
          </h1>
          <p className="detail-description">{spotData.description}</p>
        </div>
        <div className="reservation-container">
          <div className="reserve-text">
            <p>{`$${spotData.price} night`}</p>
            <div className="rating-container">
              <p>
                <i className="fa-solid fa-star"></i>
                {`${spotData.avgStarRating}`}
              </p>
              {spotData.numReviews > 0 && (
                <>
                  <p>·</p>
                  <p>{`${spotData.numReviews} ${
                    spotData.numReviews === 1 ? "review" : "reviews"
                  }`}</p>
                </>
              )}
            </div>
          </div>
          <button
            className="reserve-button"
            onClick={() => alert("Feature Coming Soon...")}
          >
            Reserve
          </button>
        </div>
      </div>
      <Reviews
        avgStarRating={spotData.avgStarRating}
        numReviews={spotData.numReviews}
      />
    </div>
  );
};

export default SpotDetails;
