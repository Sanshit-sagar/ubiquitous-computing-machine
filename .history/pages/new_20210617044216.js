import React from 'react'
import StackedLayout from '../sections/StackedLayout';
import InputForm from '../components/MarkdownEditor/InputForm';

const NewLinkPage = () => {

  return (
    <div className="container w-full mx-auto py-6 px-4">

        <div className="w-full inline-flex justify-between items-center">
            <div className="flex-col justify-start items-start">
                <Breadcrumbs />
                <h1 className="text-3xl py-2 border-b mb-4">
                    {`${uid}'s saved links`}
                </h1>
            </div>

            <StatisticsCards /> 
      
            <StackedLayout 
              pageMeta={{ title: 'Write blog post' }} 
              children={<InputForm />} 
            />
        </div>
    </div>
  );
};

export default NewLinkPage;