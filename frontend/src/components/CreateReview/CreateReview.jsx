import { createNewReview } from "../../store/reviewsReducer";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOneSpot } from "../../store/spotsReducer";
import "./CreateReview.css";
