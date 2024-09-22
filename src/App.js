import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Booking from './Components/Booking';
import MyBooking from './Components/MyBooking';
import Baggage from './Components/Baggage';
import Lounge from './Components/Lounge';
import Help from './Components/Help';
import Login from './Components/Login';
import Register from './Components/Register';
import FlightFind from './Components/FlightFind';
import { FormProvider } from './Components/FormContext';
import PersonalDetails from './Components/PersonalDetails';
import BookingSummary from './Components/BookingSummary';
import Payment from './Components/Payment';
import SuccessPay from './Components/SuccessPay';
import Admin from './adminPages/AdminControls';
import Airport from './adminPages/Airport';
import Routecrud from './adminPages/Routecrud';
import User from './adminPages/User';
import ProtectedRoute from './auth/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <FormProvider>
          <Navbar />
          <Routes>
            <Route path='/' element={<Booking />} />
            <Route path='/MyBooking' element={<ProtectedRoute component={MyBooking} allowedRoles={['user']} />} />
            <Route path='/Baggage' element={<ProtectedRoute component={Baggage} allowedRoles={['user']} />} />
            <Route path='/Lounge' element={<ProtectedRoute component={Lounge} allowedRoles={['user']} />} />
            <Route path='/About Us' element={<Home />} />
            <Route path='/Help' element={<ProtectedRoute component={Help} allowedRoles={['user']} />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Login/Register' element={<Register />} />
            <Route path='/FlightFind' element={<ProtectedRoute component={FlightFind} allowedRoles={['user']} />} />
            <Route path='/FlightFind/PersonalInfo' element={<ProtectedRoute component={PersonalDetails} allowedRoles={['user']} />} />
            <Route path='/BookingSummary' element={<ProtectedRoute component={BookingSummary} allowedRoles={['user']} />} />
            <Route path='/Payment' element={<ProtectedRoute component={Payment} allowedRoles={['user']} />} />
            <Route path='/Payment/SuccessPay' element={<ProtectedRoute component={SuccessPay} allowedRoles={['user']} />} />
            <Route path='/adminpanel' element={<ProtectedRoute component={Admin} allowedRoles={['admin']} />} />
            <Route path='/adminpanel/Airports' element={<ProtectedRoute component={Airport} allowedRoles={['admin']} />} />
            <Route path='/adminpanel/Routes' element={<ProtectedRoute component={Routecrud} allowedRoles={['admin']} />} />
            <Route path='/adminpanel/User' element={<ProtectedRoute component={User} allowedRoles={['admin']} />} />
          </Routes>
        </FormProvider>
      </Router>
    </div>
  );
}

export default App;
