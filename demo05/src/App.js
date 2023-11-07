import { NavLink, Routes, Route } from "react-router-dom";
import Pocketmon from "./components/Pocketmon";
import Book from "./components/Book";
import Home from "./components/Home";
import Menu from "./components/Menu";
import BookInfinite from "./components/BookInfinite";

function App() {
  return (
    <div className="container-fluid">
      {/* 상단 메뉴 영역 */}
        <Menu/>

      {/* 본문 영역 */}
      <div className="row">
        <div className="col-md-8 offset-md-2 col-sm-10 offset-sm-1">
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route path="/pocketmon" element={<Pocketmon/>}></Route>
          <Route path="/book" element={<Book/>}></Route>
          <Route path="/book2" element={<BookInfinite/>}></Route>
        </Routes>
        </div>
      </div>

    </div>
  );
}

export default App;
