import React from 'react'
import Link from 'next/link';

const ActiveLink = ({ href, ref, children }) => {

  const isInternalLink = href && href.startsWith('/');

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a ref={ref}>{children}</a>
      </Link>
    );
  }

  let hostname = new URL(href).hostname

  return (
    <a 
        href={href} 
        ref={ref}
        target="_blank" 
        rel="noopener noreferrer" 
        style={{ color: 'navy' }}
    >
      {hostname}
    </a>
  );
};

export default ActiveLink