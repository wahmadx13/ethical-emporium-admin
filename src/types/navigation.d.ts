import { ReactComponentElement, ReactNode } from "react";

export interface IRoute {
  name: string;
  layout?: string;
  icon: ReactComponentElement | string;
  secondary?: boolean;
  path?: string;
  subRoutes?: {
    name?: string;
    icon?: ReactComponentElement | string;
    path?: string;
  }[];
}
