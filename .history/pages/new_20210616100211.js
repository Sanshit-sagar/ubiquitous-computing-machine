import React from 'react'
// import { useRouter } from 'next/router';
// import { useSession } from 'next-auth/client';
// import axios from 'axios';
// import { protectRoute } from '@/lib/utils';
import { Layout } from '@/sections/index';
import NewLinkForm from '@/components/MarkdownEditor/NewLinkForm';
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
    <Layout pageMeta={{ title: 'Write blog post' }}>
      {/* <div className="w-full max-w-screen-lg mx-auto py-8 sm:py-12"> */}
        <NewLinkForm />
      {/* </div> */}
    </Layout>
  );
};

// export const getServerSideProps = protectRoute;

export default NewLinkPage;