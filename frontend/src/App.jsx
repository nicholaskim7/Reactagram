import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import User from './User';
import Welcome from './Welcome';
import Login from './Login';
import In from './UserLoggedin';
import Public from './PublicProfile';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';
import Navbar from './Navibar';
import Navbar2 from './Navibar2';
import Profile from './UserProfile';
import Photos from './photos';
import Feed from './Feed';
import PublicFeed from './PublicFeed';
import Draw from './Draw';
import FollowersList from './Followers';
import FollowingList from './Following';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar2/>
        <Routes>
          <Route path='/' element={<Welcome/>}></Route>
          <Route path='/users' element={<User/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/loggedin/:id' element={<In />}></Route>
          <Route path='/publicprofile/:name' element={<Public />}></Route>
          <Route path='/loggedin/updatelogin/:id' element={<UpdateUser />}></Route>
          <Route path='/create' element={<CreateUser/>}></Route>
          <Route path='/update/:id' element={<UpdateUser/>}></Route>
          <Route path='/loggedin/updateprofile/:id' element={<Profile />}></Route>
          <Route path='/photos' element={<Photos />}></Route>
          <Route path='/feed' element={<Feed />}></Route>
          <Route path='/posts' element={<PublicFeed />}></Route>
          <Route path='/draw' element={<Draw />}></Route>
          <Route path="/followers/:id" element={<FollowersList />} />
          <Route path="/following/:id" element={<FollowingList />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
