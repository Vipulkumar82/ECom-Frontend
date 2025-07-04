import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="bg-amber-200 shadow-emerald-200 w-full h-[8vh] flex items-center justify-end">
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
    <li className="bg-blue-300 py-1 px-10 rounded-2xl">
      <Link to={`${props.path}`}>{props.text}</Link>
    </li>
  );
}
