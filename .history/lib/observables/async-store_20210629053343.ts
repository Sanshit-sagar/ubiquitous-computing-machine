import Store from './store'

export interface AysncState<Data, Error> {
    loading: boolean,
    data: Data,
    error: Error
};

type CB<D> = (data: D | null) => D | null | void;

class AsyncStore<S extends AysncState<any>> extends Store<S> {
    setLoading() {
        this.set(state => {
            state.loading = true;
            state.error = null; 
        })
    }

    setData(recipe: S['data'] | CB<S['data']>) {
        this.set(state => {
          state.loading = false;
          state.error = null;
    
          function callFn(cb: CB<S['data']>) {
            return cb(state.data);
          }
    
          if (typeof recipe === 'function') {
            const data = callFn(<CB<S['data']>>recipe);
            if (data !== undefined) state.data = data;
          } else {
            state.data = <S['data']>recipe;
          }
        });
    }
    
    setError(error: S['error']) {
        this.set(state => {
            state.loading = false;
            state.error = error;
        });
    }

}

export default AsyncStore

