import React from 'react';
import Trend from 'react-trend';
import { Box } from '../../primitives/Box'

const Trendline = () => (
      <Box css={{ bc: '$loContrast', color: '$hiContrast', borderColor: '$hiContrast', border: '1px solid', br: '$1'}}>
        <Trend
          smooth
          autoDraw
          autoDrawDuration={3000}
          autoDrawEasing="ease-out"
          data={[0,2,5,9,5,10,3,5]}
          gradient={['#00c6ff', '#F0F', '#FF0']}
          radius={10}
          strokeWidth={2}
          strokeLinecap={'butt'}
        />
      </Box>
);

export default Trendline