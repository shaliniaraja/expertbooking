import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ExpertsList() {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Pagination & Filter states
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  // ✅ Fetch experts function
  const fetchExperts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/experts", {
        params: { page, limit: 5, search, category },
      });
      setExperts(res.data.experts);
      setTotal(res.data.total); // total number of experts from backend
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  // ✅ Fetch experts initially and whenever page changes
  useEffect(() => {
    fetchExperts();
  }, [page]);

  if (loading) return <h2 style={styles.loading}>Loading...</h2>;

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Our Experts</h1>

      {/* 🔹 Search and Filter */}
      <div style={styles.filterContainer}>
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.input}
        >
          <option value="">All Categories</option>
          <option value="Career Guidance">Career Guidance</option>
          <option value="Business Strategy">Business Strategy</option>
        </select>

        <button
          onClick={() => { setPage(1); fetchExperts(); }}
          style={styles.searchButton}
        >
          Search
        </button>
      </div>

      {/* 🔹 Experts Grid */}
      <div style={styles.grid}>
        {experts.map((expert) => (
          <div key={expert._id} style={styles.card}>
            <h3 style={styles.name}>{expert.name}</h3>

            <p>
              <strong>Category:</strong> {expert.category}
            </p>

            <p>
              <strong>Experience:</strong> {expert.experience} years
            </p>

            <p>
              <strong>Rating:</strong> ⭐ {expert.rating}
            </p>

            <Link to={`/experts/${expert._id}`} style={styles.button}>
              View Details
            </Link>
          </div>
        ))}
      </div>

      {/* 🔹 Pagination */}
      <div style={styles.pagination}>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          style={styles.pageButton}
        >
          Prev
        </button>

        <span> Page {page} </span>

        <button
          disabled={page * 5 >= total}
          onClick={() => setPage(page + 1)}
          style={styles.pageButton}
        >
          Next
        </button>
      </div>
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
  loading: {
    textAlign: "center",
    marginTop: "100px",
  },
  filterContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "6px 10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  searchButton: {
    padding: "6px 12px",
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    transition: "0.3s ease",
  },
  name: {
    marginBottom: "10px",
    color: "#333",
  },
  button: {
    display: "inline-block",
    marginTop: "10px",
    padding: "8px 12px",
    backgroundColor: "#2196F3",
    color: "white",
    textDecoration: "none",
    borderRadius: "6px",
  },
  pagination: {
    marginTop: "30px",
    textAlign: "center",
  },
  pageButton: {
    padding: "6px 12px",
    margin: "0 10px",
    cursor: "pointer",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
};

export default ExpertsList;