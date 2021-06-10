import faunadb, { query as q, Expr } from 'faunadb';
import slugify from 'slugify';
import { v4 as uuidv4 } from 'uuid';

export const flattenData = obj => {
    if (!obj) return null;
  
    if (Array.isArray(obj.data)) {
      // recursively flatten all documents inside the data array
      return {
        ...obj,
        data: obj.data.map(e => flattenData(e)),
      };
    } else {
      // flatten the document's data
      return { ...obj.data, id: obj.ref.value.id };
    }
};

class QueryManager {
    constructor() {
      this.client = new faunadb.Client({
        secret: process.env.NEXT_PUBLIC_FAUNADB_SECRET,
      });
    }

    getAllSlugs() {
        return this.client.query(q.Paginate(q.Match(q.Index('all_slugs'))));
    }

    getPost(id) {
        return this.client
          .query(q.Get(q.Ref(q.Collection('blog_posts'), id)))
          .then(res => flattenData(res));
    }

    getPostBySlug(slug) {
        return this.client
            .query(q.Get(q.Match(q.Index('posts_by_slug'), slug)))
            .then(res => flattenData(res));
    }

    // Paginate(Match(Index('slugged_posts_sorted_by_slug')))
    getPostByPublished() {
        return this.client
            .query(q.Paginate(q.Match(q.Index('slugged_posts_sorted_by_slug'))))
            .then(res => flattenData(res)); 
    }
}
  
export const faunaQueries = new QueryManager();
