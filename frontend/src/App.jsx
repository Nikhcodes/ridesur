import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import PassengerDashboard from './pages/passenger/Dashboard'
import BookRide from './pages/passenger/BookRide'
import RideStatus from './pages/passenger/RideStatus'
import RideHistory from './pages/passenger/RideHistory'
import Profile from './pages/passenger/Profile'
import DriverDashboard from './pages/driver/Dashboard'
import RideRequests from './pages/driver/RideRequests'
import CurrentRide from './pages/driver/CurrentRide'
import Earnings from './pages/driver/Earnings'
import DriverRideHistory from './pages/driver/RideHistory'
import AdminDashboard from './pages/admin/Dashboard'
import AdminUsers from './pages/admin/Users'
import AdminDrivers from './pages/admin/Drivers'
import AdminRides from './pages/admin/Rides'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/passenger/dashboard" element={<PassengerDashboard />} />
        <Route path="/passenger/book" element={<BookRide />} />
        <Route path="/passenger/status" element={<RideStatus />} />
        <Route path="/passenger/history" element={<RideHistory />} />
        <Route path="/passenger/profile" element={<Profile />} />
        <Route path="/driver/dashboard" element={<DriverDashboard />} />
        <Route path="/driver/requests" element={<RideRequests />} />
        <Route path="/driver/current" element={<CurrentRide />} />
        <Route path="/driver/earnings" element={<Earnings />} />
        <Route path="/driver/history" element={<DriverRideHistory />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/drivers" element={<AdminDrivers />} />
        <Route path="/admin/rides" element={<AdminRides />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App