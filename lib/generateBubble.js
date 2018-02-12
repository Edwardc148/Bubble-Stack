import COLORS from './colors';
import _ from 'lodash';

class Bubble {

  constructor(){
    this.radius = 10;
    this.color = _.sample(COLORS);
  }

}

export default Bubble;
