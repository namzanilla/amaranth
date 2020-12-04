import React from 'react';
import {HocWrap} from './style';

export default (props) => {
   return (
     <HocWrap
      display={props.display}
     >
       {props.children}
     </HocWrap>
   );
}
