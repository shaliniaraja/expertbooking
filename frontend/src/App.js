import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExpertsList from "./pages/ExpertList";
import ExpertDetail from "./pages/ExpertDetail";
import BookingForm from "./pages/BookingForm";
import MyBookings from "./pages/MyBookings";
import Login from "./pages/Login";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/expertlist" element={<ExpertsList />} />
        <Route path="/experts/:id" element={<ExpertDetail />} />
        <Route path="/book/:id" element={<BookingForm />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;