import React from 'react'
import StackedLayout from '../sections/StackedLayout';
import InputForm from '../components/MarkdownEditor/InputForm';

const NewLinkPage = () => {

  return (
    <StackedLayout 
      pageMeta={{ title: 'Write blog post' }} 
      children={<InputForm />} 
    />
  );
};

export default NewLinkPage;