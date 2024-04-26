import { deleteCurrReview } from "../../store/reviewsReducer";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
// import { useNavigate } from "react-router-dom";
import "./DeleteReview.css";

export const DeleteReview = ({ review }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  // const navigate = useNavigate();

  // console.log(spot.id);
  const deleteEvent = (e) => {
    e.preventDefault();
    dispatch(deleteCurrReview(review.id));
    closeModal();
    window.location.reload();
  };

  return (
    <div className="modal-confirmation">
      <div className="confirmation-text">
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to delete this review?</p>
      </div>
      <div className="button-cont">
        <div className="left">
          <button onClick={deleteEvent} className="yes-delete">
            {" "}
            Yes (Delete Review)
          </button>
        </div>
        <div className="right">
          <button onClick={closeModal} className="no-delete">
            No (Keep Review)
          </button>
        </div>
      </div>
    </div>
  );
};
