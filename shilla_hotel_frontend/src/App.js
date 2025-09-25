import { Routes, Route } from 'react-router-dom'
import './App.scss';
import './styles/custom.scss';
import Home from './page/Home';
import LoginForm from './page/member/LoginForm';
import SignupForm from './page/member/SignupForm';
import Detail from './page/Detail';
import SelectRoom from './page/SelectRoom';
import Cart from './page/Cart';
import BoardList from './page/board/BoardList';
import NewBoardForm from './page/board/NewBoardForm';
import UpdateBoardForm from './page/board/UpdateBoardForm';
import BoardDetail from './page/board/BoardDetail';
import Review from './page/Review';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/event/:id" element={<Detail type="event" />} />
        <Route path="/package/:id" element={<Detail type="package" />} />
        <Route path="/room/:id" element={<Detail type="room" />} />
        <Route path="/select-room" element={<SelectRoom/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/board" element={<BoardList/>} />
        <Route path="/board/:id" element={<BoardDetail/>} />
        <Route path="/board/new" element={<NewBoardForm/>} />
        <Route path="/board/edit/:id" element={<UpdateBoardForm/>} />
        <Route path="/review" element={<Review/>} />
      </Routes>
    </div>
  );
}

export default App;
