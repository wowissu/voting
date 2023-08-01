import React from 'react';

export function usePrevious<D>(newValue: D) {
  const previousRef = React.useRef<D>();

  React.useEffect(() => {
    previousRef.current = newValue;
  });

  return previousRef.current;
}