import Link from 'next/link';

export const ActiveLink = ({ href, children }) => {
  const isInternalLink = href && href.startsWith('/');

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a>{children}</a>
      </Link>
    );
  }
  let hostname = new URL(href).hostname

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {hostname}
    </a>
  );
};