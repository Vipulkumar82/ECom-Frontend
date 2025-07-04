import Filteration from "../componants/Filteration";
import ProductDetails from "./ProductDetails";

function Home() {

  return (
    <div className="flex w-full">
      <Filteration/>
      <ProductDetails/>
    </div>
  );
}

export default Home;
