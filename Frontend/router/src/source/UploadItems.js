import { useNavigate } from "react-router-dom";
import "./UploadItems.css";
const UploadItems = () => {
  const navigate = useNavigate();

  return (
    <div className="upload-container1">
      <button onClick={() => navigate("/donationList")} className="view-donations-button">
        View Donations
      </button>
    </div>
  );
};
export default UploadItems;