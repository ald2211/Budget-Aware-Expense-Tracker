import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import NotFound from "../components/NotFound";
import Test from "../components/Test";

const Routers = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Test />} />
      <Route path="*" element={<NotFound />} />
    </>
  )
);

export default Routers;
