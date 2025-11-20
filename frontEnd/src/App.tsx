import { RouterProvider } from "react-router-dom";
import Routers from "./routes/Routers";

const App = () => {
  return <RouterProvider router={Routers} />;
};

export default App;
