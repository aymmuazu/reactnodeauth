import { useEffect } from 'react';

function CustomPageTitle({ title }) {
  useEffect(() => {
    document.title = title;
  }, [title]); 

  return null; 
}

export default CustomPageTitle;