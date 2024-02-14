/* eslint-disable */

// chakra imports
import { IRoute } from 'types/navigation';
import SingleLink from './Link';
interface SidebarLinksProps {
  routes: IRoute[];
}

export function SidebarLinks(props: SidebarLinksProps) {
  const { routes } = props;

  // this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
  const createLinks = (routes: IRoute[]) => {
    return routes.map((route, index: number) => {
      if (route.path) {
        return (
          <SingleLink
            key={index}
            path={route.path}
            name={route.name}
            href={route.layout + route.path}
            icon={route.icon}
          />
        );
      } 
      else {
        return (
          <SingleLink
            href={route.layout}
            name={route.name}
            icon={route.icon}
            subRoutes={route.subRoutes}
          />
        );
      }
    });
  };
  //  BRAND
  return <>{createLinks(routes)}</>;
}

export default SidebarLinks;
