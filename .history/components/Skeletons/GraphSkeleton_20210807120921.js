import React from 'react'
import ContentLoader from 'react-content-loader'

const GraphSkeleton = () => {

    return (
        <ContentLoader width={1280} height={400} viewBox="0 0 1280 400">
            <rect x="0" y="160" rx="0" ry="0" width="75" height="500" />
            <rect x="80" y="145" rx="0" ry="0" width="75" height="400" />
            <rect x="160" y="126" rx="0" ry="0" width="75" height="306" />
            <rect x="240" y="80" rx="0" ry="0" width="75" height="600" />
            <rect x="320" y="142" rx="0" ry="0" width="75" height="358" />
            <rect x="400" y="142" rx="0" ry="0" width="75" height="358" />
            <rect x="480" y="142" rx="0" ry="0" width="75" height="358" />
            <rect x="560" y="142" rx="0" ry="0" width="75" height="358" />
            <rect x="640" y="142" rx="0" ry="0" width="75" height="358" />
            <rect x="720" y="142" rx="0" ry="0" width="75" height="500" />
            <rect x="800" y="142" rx="0" ry="0" width="75" height="355" />
            <rect x="880" y="142" rx="0" ry="0" width="75" height="376" />
            <rect x="960" y="142" rx="0" ry="0" width="75" height="420" />
            <rect x="1040" y="142" rx="0" ry="0" width="75" height="420" />
            <rect x="1120" y="142" rx="0" ry="0" width="75" height="358" />
            <rect x="1200" y="142" rx="0" ry="0" width="60" height="358" />
        </ContentLoader>
    )
}

export default GraphSkeleton