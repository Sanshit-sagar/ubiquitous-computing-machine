import slugify from 'slugify'
import { v4 as uuid } from 'uuid'
import faunadb, { query as q } from 'faunadb'


class QueryManager {
    constructor() {
      this.client = new faunadb.Client({
        secret: process.env.NEXT_PUBLIC_FAUNADB_SECRET,
      });
    }

    getAllSlugs() {
        return this.client.query(q.Paginate(q.Match(q.Index('all_slugs'))));
    }

    getPosts(options = {}) {
        const { author = null, ...opts } = options;
        return this.client
          .query(
            // iterate each item in result
            q.Map(
              // paginate the result into smaller chuncks (default size is 64)
              q.Paginate(
                q.Join(
                  // get published posts only and by author (optional)
                  author
                    ? q.Match(q.Index('posts_by_published_author'), [true, author])
                    : q.Match(q.Index('posts_by_published'), true),
                  // sort them by published date (descending)
                  q.Index('posts_sort_by_published_at_desc')
                ),
                opts
              ),
              // retrieve each document from the query
              q.Lambda(['published_at', 'ref'], q.Get(q.Var('ref')))
            )
        )
        
        .then(res => flattenData(res));
    }
    
    createPost({ title, content, author }) {
        return this.client
        .query(
            q.Create(q.Collection('blog_posts'), {
            data: {
                title,
                content,
                author,
                published: false,
                created_at: q.ToString(q.Now()),
                updated_at: q.ToString(q.Now()),
            },
            })
        )   
        
        .then(res => flattenData(res));
    }

    updatePost(id, data) {
        return this.client
        .query(
            q.Update(q.Ref(q.Collection('slugged_posts'), id), {
            data: { ...data, updated_at: q.ToString(q.Now()) },
            })
        )
        .then(res => flattenData(res));
    }

    deletePost(id) {
        return this.client
        .query(q.Delete(q.Ref(q.Collection('slugged_posts'), id)))
        .then(res => flattenData(res));
    }

}
