// LayoutRoute.tsx
import { Outlet } from "react-router-dom";
import { Layout } from "./Layout";



export const LayoutRoute = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
