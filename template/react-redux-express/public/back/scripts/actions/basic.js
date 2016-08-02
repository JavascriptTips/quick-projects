/**
 * Created by zyg on 16/8/2.
 */
import { BASIC_INIT} from '../constants/basicTypes'


export var basicInit = (i)=>{

  return {
    type:BASIC_INIT,
    value:i,
  }
}