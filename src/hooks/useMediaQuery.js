import { useState, useEffect } from 'react';

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    
    media.addEventListener('change', listener);
    listener(); // 初始化检查
    
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}; 