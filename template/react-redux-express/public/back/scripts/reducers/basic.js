import { BASIC_INIT} from '../constants/basicTypes'
import reducerHandlerBuild from '../../../common/reducerHandlerBuild'

const handler = {

  [BASIC_INIT](state,{value}){

    return value || 0;
  },
};

export default reducerHandlerBuild(handler,[]);