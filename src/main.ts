import './style.css';

import { ballsModule } from './articles/ball';
import { helloModule } from './articles/hello';
import { createSite } from './common/core';

createSite([ballsModule, helloModule]);
