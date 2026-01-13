import { Routes, Route } from "react-router-dom";
import SiteLayout from "./layouts/SiteLayout";
import { routes } from "./router/routes";

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        {routes.map((r) => (
          <Route key={r.path} path={r.path} element={r.element} />
        ))}
      </Route>
    </Routes>
  );
}
