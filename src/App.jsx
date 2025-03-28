import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import UsersList from "./pages/UsersList";
import EditUser from "./pages/EditUser";
import { UserProvider } from "./context/UserContext";


const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/users", element: <UsersList /> },
  { path: "/edit/:id", element: <EditUser /> },
]);

const AppWrapper = () => {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
};

export default AppWrapper;
