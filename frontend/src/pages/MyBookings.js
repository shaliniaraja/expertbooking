import React, { useEffect, useState } from "react";
import axios from "axios";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const res = await axios.get("http://localhost:5000/bookings");
    setBookings(res.data);
  };

  const acceptBooking = async (id) => {
    await axios.patch(`http://localhost:5000/bookings/${id}/status`, {
      status: "confirmed",
    });
    fetchBookings();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Bookings</h2>

      {bookings.length === 0 && (
        <p style={styles.noBookings}>No bookings available</p>
      )}

      {bookings.map((b) => (
        <div key={b._id} style={styles.card}>
          <div style={styles.row}>
            <span style={styles.label}>Date:</span>
            <span>{b.date}</span>
          </div>
         
          <div style={styles.row}>
            <span style={styles.label}>Time:</span>
            <span>{b.timeSlot}</span>
          </div>

          <div style={styles.row}>
            <span style={styles.label}>Status:</span>
            <span
              style={{
                ...styles.status,
                backgroundColor:
                  b.status.toLowerCase() === "confirmed"
                    ? "#2196F3"
                    : "#FF9800",
              }}
            >
              {b.status}
            </span>
          </div>

          {localStorage.getItem("role") === "expert" &&
            b.status.toLowerCase() === "pending" && (
              <button
                style={styles.button}
                onClick={() => acceptBooking(b._id)}
              >
                Accept
              </button>
            )}
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "40px",
    background: "#f4f6f9",
  },
  heading: {
    textAlign: "center",
    marginBottom: "30px",
  },
  noBookings: {
    textAlign: "center",
    color: "#777",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    maxWidth: "500px",
    margin: "20px auto",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  label: {
    fontWeight: "bold",
  },
  status: {
    padding: "5px 10px",
    borderRadius: "20px",
    color: "white",
    fontSize: "12px",
    textTransform: "capitalize",
  },
  button: {
    marginTop: "10px",
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "rgb(33, 140, 243)",
    color: "white",
    cursor: "pointer",
  },
};

export default MyBookings;
