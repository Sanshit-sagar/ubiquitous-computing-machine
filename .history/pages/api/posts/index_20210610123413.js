import { faunaQueries } from '@/lib/fauna';

// -> /api/posts
// export default async function handler(req, res) {
//   try {
//     if (req.method === 'GET') {
//       const { size = 10, cursor = undefined, author = '' } = req.query;
//       const posts = await faunaQueries.getPosts({
//         author,
//         size, 
//         after: faunaQueries.toExpr(cursor),
//       });
//       res.status(200).json(posts);
//     }
//     else if (req.method === 'POST') {
//       const post = await faunaQueries.createPost(req.body);
//       res.status(200).json(post);
//     }
//     else {
//       res
//         .status(400)
//         .json({ message: `HTTP method ${req.method} is not supported.` });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: err.message });
//   }
// }

export default async function handler(req, res) {
  try {
    if(req.method === 'POST') {
      const post = await faunaQueries.createPost(req.body);
      res.status(200).json(post);
    } else {
      res.status(400).json({ message: `HTTP method ${req.method} is not supported.` });
    }
  } catch (error) {
      console.log(err);
      res.status(500).json({ message: err.message });
  }
}