import './style.css';

import { createSite } from './common/core';
import { balls, } from './articles/ball';
import { trigonometry } from './articles/trigonometry';


createSite([
    // ...trigonometry,
    ...balls
]);
