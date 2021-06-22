import { setCookie } from '../../lib/security'

const handler = (req, res) => {
    try {
        setCookie(res, 'Next.js', 'COOKIE MONSTER!')
        res.end(res.getHeader('Set-Cookie'))
    } catch (error) {
        res.status(404).json({ error })
    }
}

export default handler