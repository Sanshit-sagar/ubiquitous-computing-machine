import { setCookie } from '../../utils/cookies'

const handler = (req, res) => {
    try {
        setCookie(res, 'Next.js', 'COOKIE MONSTER!')
        res.end(res.getHeader('Set-Cookie'))
    } catch (err) {
        res.status(404).json({ error })
    }
}

export default handler