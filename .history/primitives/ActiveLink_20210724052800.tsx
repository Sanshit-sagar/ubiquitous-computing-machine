
import { useContext } from 'react'
import Link from 'next/link';
import { GlobalStore } from '../store'

const ActiveLink = ({ href, children }) => {
  
  const isInternalLink = href && href.startsWith('/');
  const state = useContext(GlobalStore.State)

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a>{children}</a>
      </Link>
    );
  }

  let hostname = new URL(href).hostname

  return (
    <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        style={{ color: 'navy' }}
    >
      {hostname}
    </a>
  );
};

export default ActiveLink