import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="bg-[#8AAAE5] w-full h-[8vh] flex items-center justify-end">
      <ul className="flex gap-8 justify-around px-6 py-4">
        <MyList path="/" text="HOME" />
        <MyList path="/about" text="ABOUT" />
        <MyList path="/contact" text="CONTACT" />
        <MyList path="/cart" text="CART" />
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
    <li className="bg-white py-1 px-10 rounded-2xl cursor-pointer hover:bg-[#7090d1] p-2 transition-colors">
      <Link to={`${props.path}`}>{props.text}</Link>
    </li>
  );
}
