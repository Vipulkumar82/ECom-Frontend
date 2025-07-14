import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Auth";
const Navbar = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <div className="bg-[#8AAAE5] w-full h-[8vh] flex items-center justify-end">
      <ul className="flex gap-8 justify-around px-6 py-4">
        <MyList path="/" text="HOME" />
        <MyList path="/about" text="ABOUT" />
        <MyList path="/contact" text="CONTACT" />
        <MyList path="/cart" text="CART" />
        {!token && <MyList path="/login" text="LOGIN" />}
        {!token && <MyList path="/register" text="REGISTER" />}
        {token && (
          <button
            onClick={handleLogout}
            className="bg-white py-1 px-10 rounded-2xl cursor-pointer hover:bg-[#7090d1] p-2 transition-colors"
          >
            LOGOUT
          </button>
        )}
      </ul>
    </div>
  );
};
export default Navbar;
interface ListProps{
    path:string,
    text:string
}
function MyList(props:ListProps) {
  return (
    <Link to={`${props.path}`} className="bg-white py-1 px-10 rounded-2xl cursor-pointer hover:bg-[#7090d1] p-2 transition-colors">
      <li>{props.text}</li>
    </Link>
  );
}
