import { useState } from "react";
import style from "./GetQuote.module.css";

// Define constants for the API key and endpoint from environment variables
const API_KEY = import.meta.env.VITE_VISION_PREDICTION_KEY;
const ENDPOINT = import.meta.env.VITE_VISION_PREDICTION_ENDPOINT;

export default function GetQuote() {
  const [selectedFile, setSelectedFile] = useState(null); // State to store the selected file and its preview URL
  const [filePreview, setFilePreview] = useState(""); // For image preview
  const [prediction, setPrediction] = useState(""); // State to store the prediction result from the API
  const [loading, setLoading] = useState(false); // State to handle loading state

  // Function to handle file input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file); // Update the selected file state
    setFilePreview(URL.createObjectURL(file)); // Create and set the file preview URL
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    setLoading(true); // Set loading state to true while processing

    const reader = new FileReader();

    // Event handler when the file is read
    reader.onload = function (e) {
      const arrayBuffer = e.target.result; // Get the array buffer of the file

      fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Prediction-Key": API_KEY,
          "Content-Type": "application/octet-stream",
        },
        body: arrayBuffer, // Send the file as array buffer
      })
        .then((response) => response.json()) // Parse the JSON response
        .then((data) => {
          if (data.predictions && data.predictions.length > 0) {
            const firstPrediction = data.predictions[0]; // Get the first prediction result
            setPrediction(firstPrediction.tagName); // Update the prediction state
          } else {
            setPrediction("No prediction available"); // Handle case with no predictions
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("There was an error making the prediction. Please try again.");
        })
        .finally(() => {
          setLoading(false); // Reset loading state
        });
    };

    // Event handler for file reading errors
    reader.onerror = function (error) {
      console.error("Error reading file:", error);
    };

    reader.readAsArrayBuffer(selectedFile); // Read the file as an ArrayBuffer
  };

  return (
    <div className={style.background}>
      <h1>What's your vehicle type? (PROTOTYPE)</h1>
      <div className={style.uploadCard}>
        <form className={style.submitCard} onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button className={style.btn} type="submit" disabled={loading}>
            {loading ? "Processing..." : "Upload"}
          </button>
        </form>
      </div>

      <div className={style.showCard}>
      {prediction && (
          <p>
            Your vehicle type is:{" "}
            <span className={style.prediction}>a {prediction}</span>
          </p>
        )}
        {filePreview && (
          <div className={style.showPrediction}>
            <img
              className={style.uploadImg}
              src={filePreview}
              alt="uploaded-image-of-vehicle"
              id="image-preview"
            />
            {prediction && (
              <div className={style.showDetails}>
              <h3>Your Repayments</h3>
              <p>$ ????? per week</p>
              <p>$ ????? per month</p>
              <p>$ ????? per annum</p>
              <p>? year</p>
              <p>Total amount payable over term of the loan $????</p>
            </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
