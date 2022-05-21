import React, { useEffect, useRef } from 'react';

const useDidMountEffect = (func : () => void, deps : any[]) => {
    const didMount = useRef(false);

    useEffect(() => {
        console.log(didMount.current, deps)
        if (didMount.current) {
            func();
        }
        else didMount.current = true;
    }, deps);
}

export default useDidMountEffect;