import {createContext} from 'react';
import Snoowrap from 'snoowrap';

interface ClearContextInferface {
  clear: any;
  updateClear: any;
}

const ClearContext = createContext<ClearContextInferface>({
  clear: {snoowrap: null},
  updateClear: null,
});

export default ClearContext;
