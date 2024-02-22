import { IRoute, IRoutes } from "../types/navigation";

// NextJS Requirement
export const isWindowAvailable = () => typeof window !== "undefined";

export const findCurrentRoute = (routes: IRoute[]): IRoute | IRoutes => {

  const foundRoute: IRoutes[] = routes.map((route) => {
    if (route.path) {
      return isWindowAvailable() && window.location.href.indexOf(route.layout + route.path) !== -1 && route
    } else if (route?.subRoutes) {
      const { subRoutes } = route;
      const resultedRoute = subRoutes.find((subRoute) => {
        if (isWindowAvailable() && window.location.href.indexOf(route.layout + subRoute.path) !== -1) {
          return subRoute
        }
      })
      return resultedRoute
    }
  }
  )
  const resArr = foundRoute.filter(Boolean)
  return resArr[0];
};

export const getActiveRoute = (routes: IRoute[]): string => {
  const route = findCurrentRoute(routes);
  return route?.name || "Default Brand Text";
};

export const getActiveNavbar = (routes: IRoute[]): boolean => {
  const route = findCurrentRoute(routes);
  return route?.secondary;
};

export const getActiveNavbarText = (routes: IRoute[]): string | boolean => {
  return getActiveRoute(routes) || false;
};
