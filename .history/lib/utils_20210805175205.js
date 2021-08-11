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

export const ellipses = (text, maxlen) => {
  if(text && text.length) {
      return `${text.substring(0,maxlen)}${text.length>maxlen?'...':''}`; 
  }
  return '';
}

export function getInitials(name) {
  let nameArr = name.split(' ');  
  if(!nameArr.length) return '';

  let firstInitial = nameArr[0].charAt(1);
  let secondInitial = nameArr[1]?.charAt(1) || ' '
  let initialsStr = `${firstInitial}${secondInitial}`

  return initialsStr.toUpperCase(); 
}


export function getIntent(progressValue) {
  if(progressValue >= 80) return "success";
  else if(progressValue >= 60) return "none";
  else if(progressValue >= 40) return "warning";
  return "danger";
}

export function getHost(destination) {
  return (!destination?.length) ? null : new URL(destination).hostname;
}

function isValidEmail(email) {
  return email && email?.length;
}

function isValidSession(session) {
  return session && session.user?.length ? session.user.length : '';
}