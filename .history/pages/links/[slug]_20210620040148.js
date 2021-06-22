import React from 'react'
import { useRouter } from 'next/router'

const SlugInfo = () => {
    const router = useRouter();

    const slugValue = router.query.slug 

    return (
        <StackedLayout>
            <div className="bg-white px-4 py-5 border-b border-gray-200">
                <h1> Showing data for {slugValue} </h1>
                <p> expiry </p>
                <p> created at: </p>
            </div>
        </StackedLayout>
    );
}

export default SlugInfo