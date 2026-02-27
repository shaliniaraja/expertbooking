import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // connect to backend

function ExpertDetail() {
  const { id } = useParams();
  const [expert, setExpert] = useState(null);

  // Fetch expert details
  useEffect(() => {
    axios
      .get(`http://localhost:5000/experts/${id}`)
      .then((res) => setExpert(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  // Listen for real-time slot updates
  useEffect(() => {
    socket.on("slotBooked", ({ expertId, date, timeSlot }) => {
      if (expert?._id === expertId) {
        setExpert((prev) => ({
          ...prev,
          availableSlots: prev.availableSlots.map((slot) =>
            slot.date === date
              ? { ...slot, timeSlots: slot.timeSlots.filter((t) => t !== timeSlot) }
              : slot
          ),
        }));
      }
    });

    return () => socket.off("slotBooked");
  }, [expert]);

  if (!expert) return <h2 style={styles.loading}>Loading...</h2>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.name}>{expert.name}</h1>

        <p>
          <strong>Category:</strong> {expert.category}
        </p>
        <p>
          <strong>Experience:</strong> {expert.experience} years
        </p>

        <h3 style={styles.sectionTitle}>Available Slots</h3>

        {expert.availableSlots?.map((slot, index) => (
          <div key={index} style={styles.slotCard}>
            <h4 style={styles.date}>{slot.date}</h4>

            {slot.timeSlots && slot.timeSlots.length > 0 ? (
              <div style={styles.timeContainer}>
                {slot.timeSlots.map((time, i) => (
                  <span
                    key={i}
                    style={styles.timeBox}
                    onClick={() =>
                      (window.location.href = `/book/${expert._id}?date=${slot.date}&time=${time}`)
                    }
                  >
                    {time}
                  </span>
                ))}
              </div>
            ) : (
              <p style={styles.noSlots}>No slots available</p>
            )}
          </div>
        ))}
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
    padding: "40px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "600px",
  },
  name: { marginBottom: "15px" },
  sectionTitle: { marginTop: "20px", marginBottom: "10px" },
  slotCard: { backgroundColor: "#fafafa", padding: "15px", borderRadius: "8px", marginBottom: "15px" },
  date: { marginBottom: "10px" },
  timeContainer: { display: "flex", flexWrap: "wrap", gap: "10px" },
  timeBox: { padding: "6px 12px", backgroundColor: "#2196F3", color: "white", borderRadius: "20px", fontSize: "14px", cursor: "pointer" },
  noSlots: { color: "#777" },
  loading: { textAlign: "center", marginTop: "100px" },
};

export default ExpertDetail;