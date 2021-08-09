import React from 'react'
import { useSession } from 'next-auth/client'

import Layout from '../sections/Layout'
import GraphManager from '../components/GraphManager'

const Visualizer = ({ metadata }) => {
    const [session, loading] = useSession()
    const email = !loading && session?.user ? session.user.email : ''
    
    return (
        <Layout
            metadata={metadata}
            children={
                <GraphManager email={email} />
            }
        /> 
    );
}

Visualizer.defaultProps = {
    metadata: {
        title: 'Visualizer',
        description: 'Visualizes key metrics'
    }
}

export default Visualizer