import { Helmet } from "react-helmet";
import { Route, Router } from "react-router-dom";

// Define an array of route objects
const routes = [
  {
    id: 1,
    route: "Available Foods",
    path: "/availableFoods",
    component: AvailableFoods,
  },
  {
    id: 2,
    route: "Add Food",
    path: "/addFood",
    component: AddFood,
  },
  {
    id: 3,
    route: "Update Food",
    path: "/updateFood",
    component: UpdateFood,
  },
  {
    id: 4,
    route: "Food Details",
    path: "/foodDetails",
    component: FoodDetails,
  },
  {
    id: 5,
    route: "Dashboard",
    path: "/dashboard",
    component: Dashboard,
  },
  {
    id: 6,
    route: "Profile",
    path: "/profile",
    component: Profile,
  },
  {
    id: 7,
    route: "Login",
    path: "/login",
    component: Login,
  },
  {
    id: 8,
    route: "Registration",
    path: "/registration",
    component: Registration,
  },
  {
    id: 9,
    route: "My Food Request",
    path: "/myFoodRequest",
    component: MyFoodRequest,
  },
  {
    id: 10,
    route: "Erro",
    path: "/error",
    component: ErrorPage,
  },
  {
    id: 11,
    route: "Manage My Foods",
    path: "/manageMyFoods",
    component: ManageMyFoods,
  },
];

const ReactHelmet = () => {
  return (
    <Router>
      <Switch>
        {routes.map((routeInfo) => (
          <Route key={routeInfo.id} path={routeInfo.path}>
            <Helmet>
              <title>Food Unity | {routeInfo.route}</title>
            </Helmet>
            <routeInfo.component />
          </Route>
        ))}
      </Switch>
    </Router>
  );
};

export default ReactHelmet;
