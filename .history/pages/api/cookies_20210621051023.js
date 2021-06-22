
import { setCookie } from '../../utils/cookies'

const handler = (req, res) => {
  setCookie(res, 'Next.js', 'api-middleware!')
  res.end(res.getHeader('Set-Cookie'))
}

export default handler