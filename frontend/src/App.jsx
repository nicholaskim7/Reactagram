import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import User from './User';
import Welcome from './Welcome';
import Login from './Login';
import In from './UserLoggedin';
import Public from './PublicProfile';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';
import Navbar2 from './Navibar2';
import Profile from './UserProfile';
import PublicFeed from './PublicFeed';
import Draw from './Draw';
import FollowersList from './Followers';
import FollowingList from './Following';
import Hard75 from './hard75';
import CreateToDo from './CreateToDo';


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
          <Route path='/posts' element={<PublicFeed />}></Route>
          <Route path='/draw' element={<Draw />}></Route>
          <Route path="/followers/:id" element={<FollowersList />} />
          <Route path="/following/:id" element={<FollowingList />} />
          <Route path="/hard-75/:loggedInUserId" element={<CreateToDo />} />
          {/* <Route path="/hard-75/:id" element={<Hard75 />} /> */}

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
