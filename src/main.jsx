import ReactDOM from "react-dom/client";

import UserProvider from "@src/contexts/UserContext.jsx";
import AppRouter from "@src/AppRouter.jsx";
import "@src/assets/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <AppRouter />
  </UserProvider>,
);
