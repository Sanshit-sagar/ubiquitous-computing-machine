import { useRouter } from 'next/router'

function ActiveLink({ children, href }) {
  const router = useRouter()
  const style = {
    marginRight: 10,
    color: router.asPath === href ? 'red' : 'black',
  }

  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  )
}

export default ActiveLink


// import Link from 'next/link';

// const CustomLink = ({ href, children }) => {
//   const isInternalLink = href && href.startsWith('/');

//   if (isInternalLink) {
//     return (
//       <Link href={href}>
//         <a>{children}</a>
//       </Link>
//     );
//   }

//   return (
//     <a href={href} target="_blank" rel="noopener noreferrer">
//       {children}
//     </a>
//   );
// };

// export default CustomLink;