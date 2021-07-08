import axios from 'axios';

export const fetcher = url => axios.get(url).then(res => res.data)

export default function parseUrl (url) {
  // Default values
  const defaultHost = 'http://localhost:3000'
  const defaultPath = '/api/auth'

  if (!url) { url = `${defaultHost}${defaultPath}` }

  // Default to HTTPS if no protocol explictly specified
  const protocol = url.startsWith('http:') ? 'http' : 'https'

  // Normalize URLs by stripping protocol and no trailing slash
  url = url.replace(/^https?:\/\//, '').replace(/\/$/, '')

  // Simple split based on first /
  const [_host, ..._path] = url.split('/')
  const baseUrl = _host ? `${protocol}://${_host}` : defaultHost
  const basePath = _path.length > 0 ? `/${_path.join('/')}` : defaultPath

  return { baseUrl, basePath }
}


export const isInViewport = element => {
  if (!element) return false;

  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 && rect.left >= 0 && rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};


export const formatDate = dateString => {
  try {
    return new Intl.DateTimeFormat('en', {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(new Date(dateString));
  } catch (error) {
    return null;
  }
};

export function stripUndefined() {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => typeof value !== "undefined")
  )
}

export const formatPathAsMenuHeader = pathStr => {
  if(pathStr.length > 2) {
    return `${pathStr.charAt(1).toUpperCase()}${pathStr.substring(2)}`; 
  }
  return 'Home'
}