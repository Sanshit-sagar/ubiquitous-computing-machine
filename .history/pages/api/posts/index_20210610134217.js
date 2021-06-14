import { faunaQueries } from '@/lib/fauna';

// -> /api/posts
export default async function handler(req, res) {
  try {
    // Get posts
    console.log('GETTING POSTS')
    if (req.method === 'GET') {

      const { size = 10, cursor = undefined, author = '' } = req.query;

      console.log(author); 
      // Fetch the most recent posts
      const posts = await faunaQueries.getPosts({
        // author's email
        author,
        // page size
        size,
        // /!\ should pass a FaunaDB Query Expression to the cursor (after)
        // use 'Expr' from faunadb-js to convert query param to Expression
        after: faunaQueries.toExpr(cursor),
      });
      
      console.log(posts); 
      res.status(200).json(posts);
    }
    // Create new post
    else if (req.method === 'POST') {
      const post = await faunaQueries.createPost(req.body);
      res.status(200).json(post);
    }
    // Not supported!
    else {
      res
        .status(400)
        .json({ message: `HTTP method ${req.method} is not supported.` });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}