import React from 'react';
import { TinaCMS } from 'tinacms';
import { TinaCloudAuthWall } from 'tina-graphql-gateway';
import { SidebarPlaceholder } from './helper-components';
import { createClient } from '../util';

/**
 * THIS WAS COPIED FROM https://github.com/tinacms/tina-cloud-starter
 *
 *
 * This gets loaded dynamically in "pages/_app.js"
 * if you're on a route that starts with "/admin"
 */
const TinaWrapper: React.FC = ({ children }) => {
  const cms = React.useMemo(
    () =>
      new TinaCMS({
        apis: {
          tina: createClient(),
        },
        sidebar: {
          placeholder: SidebarPlaceholder,
          buttons: {
            save: `Publish`,
            reset: `Reset`,
          },
        },
        enabled: true,
      }),
    [],
  );

  return <TinaCloudAuthWall cms={cms}>{children}</TinaCloudAuthWall>;
};

export default TinaWrapper;
