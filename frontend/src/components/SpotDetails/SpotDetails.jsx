import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOneSpot } from "../../store/spotsReducer";
import { getSpotReviews } from "../../store/reviewsReducer";
import "./SpotDetails.css";
import { useEffect } from "react";

const SpotDetails = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spotsState);
  const reviews = useSelector((state) => state.reviewsState);
  const spotData = spot[spotId];
  // console.log("SPOT DATA", spotData);
  console.log("REVIEWS", reviews);

  useEffect(() => {
    dispatch(getOneSpot(spotId));
    dispatch(getSpotReviews(spotId));
  }, [spotId, dispatch]);

  const reviewsArray = Object.values(reviews?.reviews || {});

  return (
    <div className="spot-details-container">
      {spotData && spotData.name && (
        <>
          <h2 className="details-name">{spotData.name}</h2>
          <h3 className="details-location">{`${spotData.city}, ${spotData.state}, ${spotData.country}`}</h3>
          <div className="details-img-cont">
            <img
              className="image"
              src={spotData.SpotImages[0].url}
              alt="Spot Preview"
            />
            <div className="four-images">
              {spotData.SpotImages.slice(1, 5).map((image, index) => (
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
                  <p>{`${spotData.numReviews} review(s)`}</p>
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
          <div className="reviews-container">
            <div className="rating-info">
              <p>
                <i className="fa-solid fa-star"></i>
                {`${spotData.avgStarRating}`}
              </p>
              <p>{`${spotData.numReviews} review(s)`}</p>
            </div>
            <div className="reviews-container">
              {/* Check if reviewsArray is empty and render "No Reviews Yet" if true */}
              {reviewsArray.length === 0 ? (
                <p>No Reviews Yet</p>
              ) : (
                reviewsArray.map((review) => (
                  <div key={review.id} className="each-review">
                    <h4>{review.User.firstName}</h4>
                    <p>
                      {new Date(review.createdAt).toLocaleString(undefined, {
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <p>{review.review}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SpotDetails;
