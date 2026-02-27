import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
function BookingForm() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const selectedDate = searchParams.get("date");
  const selectedTime = searchParams.get("time");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: selectedDate || "",
    timeSlot: selectedTime || "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/bookings", {
        expertId: id,
        ...formData,
      })
      .then(() => alert("Booking Successful"))
      .catch((err) => {
        if (err.response?.status === 409) {
          alert("Slot already booked");
        } else {
          alert("Error occurred");
        }
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Book Session</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            name="email"
            placeholder="Email"
            type="email"
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            name="date"
            type="date"
            value={formData.date}
            readOnly
            style={styles.input}
          />

          <input
            name="timeSlot"
            value={formData.timeSlot}
            readOnly
            style={styles.input}
          />

          <textarea
            name="notes"
            placeholder="Additional Notes"
            onChange={handleChange}
            style={styles.textarea}
          />

          <button type="submit" style={styles.button}>
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f4f6f9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  textarea: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
    minHeight: "80px",
    resize: "none",
  },
  button: {
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "white",
    fontSize: "15px",
    cursor: "pointer",
  },
};

export default BookingForm;
