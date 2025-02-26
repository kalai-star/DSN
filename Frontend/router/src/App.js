import React from "react";
import { Route,Routes } from "react-router-dom";
import Signup from "./source/Signup";
import Login from "./source/Login";
import Menu from "./source/Menu";
import Donate from "./source/Donate"
import Receiver from './source/Receiver'
import Desc from './source/Desc'
import UploadItems from "./source/UploadItems";
import DonationList from "./source/DonationList";
import { AuthProvider } from "./source/Auth";
function App() {
  return (
    <AuthProvider>
    <div className="App">
     <Routes>
      <Route path='/' element={<Desc/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/Menu' element={<Menu/>}/>
      <Route path='/donate' element={<Donate/>}/>
      <Route path='/receiver' element={<Receiver/>}/>
      <Route path="/uploadItems" element={<UploadItems />} />
      <Route path="/donationList" element={<DonationList />} />
     </Routes>
    </div>
    </AuthProvider>
  );
}
export default App;