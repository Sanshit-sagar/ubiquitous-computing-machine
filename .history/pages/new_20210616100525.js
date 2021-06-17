import React from 'react'
// import { useRouter } from 'next/router';
// import { useSession } from 'next-auth/client';
// import axios from 'axios';
// import { protectRoute } from '@/lib/utils';
import { Layout } from '../sections/StackedLayout';
import InputForm from '../components/MarkdownEditor/InputForm';
// import toast from 'react-hot-toast';


const NewLinkPage = () => {
  // const router = useRouter();
  // const [session] = useSession();

  // const handleOnChange = async (title, content) => {
  //   try {
  //     const {  data: { id }, } = await axios.post('/api/posts', {
  //       title,
  //       content,
  //       author: session.user,
  //     });

  //     router.push(`/drafts/${id}`);
  //   } catch (error) {
  //     toast.error('Unable to create post');
  //   }
  // };

  return (
    <Layout pageMeta={{ title: 'Write blog post' }} children={<InputForm />} />
  );
};

// export const getServerSideProps = protectRoute;

export default NewLinkPage;