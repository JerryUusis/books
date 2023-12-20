import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function Root({ handleInput }) {
  return (
    <div>
      <Header handleInput={handleInput} />
      <Outlet />
    </div>
  );
}

export default Root;
