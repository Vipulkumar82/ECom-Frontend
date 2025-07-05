import Filteration from "../componants/Filteration";
import ProductPage from "../componants/ProductPage";

function Home() {
  return (
    <div className="flex w-full">
      <Filteration/>
      <ProductPage/>
    </div>
  );
}

export default Home;
