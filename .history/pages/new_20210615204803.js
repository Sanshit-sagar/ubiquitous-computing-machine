import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import axios from 'axios';
import { protectRoute } from '@/lib/utils';
import { Layout } from '@/sections/index';
import Editor from '@/components/MarkdownEditor/index';
import toast from 'react-hot-toast';
import {GlobalStore} from '../store'

// const CounterTest = () => {
//   const state = useContext(GlobalStore.State)
//   const dispatch = useContext(GlobalStore.Dispatch)

//   return (
//     <>
//       <h1> Count: {state.counter} </h1> 
//       <button onClick={() => dispatch({ type: 'increment' })}> increment </button>
//       <button onClick={() => dispatch({ type: 'decrement' })}> decrement </button>
//       <button onClick={() => dispatch({ type: 'reset'})}> reset </button>
//     </>
//   )
// }

const NewDraft = () => {
  const router = useRouter();
  const [session] = useSession();

  const handleOnChange = async (title, content) => {
    try {
      const {  data: { id }, } = await axios.post('/api/posts', {
        title,
        content,
        author: session.user,
      });

      router.push(`/drafts/${id}`);
    } catch (error) {
      toast.error('Unable to create post');
    }
  };

  return (
    <Layout pageMeta={{ title: 'Write blog post' }}>
      <div className="w-full max-w-screen-lg mx-auto py-8 sm:py-12">
        <CounterTest /> 
        <Editor onChange={handleOnChange} />
      </div>
    </Layout>
  );
};

export const getServerSideProps = protectRoute;

export default NewDraft;