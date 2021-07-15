
import { useContext } from 'react'
import Link from 'next/link';
import { GlobalStore } from '../store'

export const ActiveLink = ({ href, children }) => {
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
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: state.darkMode ? '#fff' : '#000' }}>
      {hostname}
    </a>
  );
};