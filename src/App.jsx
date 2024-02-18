import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Meet from "./pages/Meet/Meet";
import Groups from "./pages/Groups/Groups";
import GroupDetails from "./pages/GroupDetails/GroupDetails";
import Login from "./pages/Login/Login";
import Footer from "./components/Footer/Footer";
import AddNewPub from "./pages/AddNewPub/AddNewPub";
import Signup from "./pages/Signup/Signup";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/meet" element={<Meet />} />
          <Route path="/meet/:groupId/pubs" element={<Meet />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/groups/:groupId" element={<GroupDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-pub" element={<AddNewPub />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
