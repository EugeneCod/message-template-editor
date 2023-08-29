import { useMemo } from 'react';
import { debounce } from 'lodash-es';

function useDebounce(callBack: (...any: any)=> unknown, ms: number) {
  return useMemo(() => 
    debounce(callBack, ms)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  , [ms])
} 

export default useDebounce;
