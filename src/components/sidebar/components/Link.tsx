import { useState } from 'react';
import { Box, Collapse } from '@chakra-ui/react';
import Link from 'next/link';
import { IRoute } from 'types/navigation';
import SingleRoute from './SingleRoute';

interface ILinkProps extends IRoute {
  href: string;
}
export default function SingleLink(props: ILinkProps) {
  const { path, name, href, icon, subRoutes } = props;

  const [showLinks, setShowLinks] = useState(false);
  const handleLinks = () => setShowLinks(!showLinks);

  return path ? (
    <Link href={href}>
      <SingleRoute path={path} icon={icon} name={name} showLinks={showLinks} />
    </Link>
  ) : (
    <>
      <Link href="" onClick={handleLinks}>
        <SingleRoute path="" icon={icon} name={name} showLinks={showLinks} />
      </Link>
      <Collapse style={{ marginLeft: '1rem' }} in={showLinks}>
        {subRoutes.map((subRoute) => {
          return (
            <Link href={href + subRoute.path} key={subRoute.name}>
              <SingleRoute
                path={subRoute.path}
                icon={subRoute.icon}
                name={subRoute.name}
                showLinks={showLinks}
              />
            </Link>
          );
        })}
      </Collapse>
    </>
  );
}
