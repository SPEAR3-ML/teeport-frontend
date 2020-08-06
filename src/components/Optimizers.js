import React, { memo } from 'react'

import { FlexFrame } from './Utils'
import MemoScrollbar from './MemoScrollbar'
import ResponsiveGrid from './ResponsiveGrid'
import Optimizer from './Optimizer'

const Optimizers = ({ clients, sendMessage }) => {
  // console.log('optimizers render!')
  const optimizers = clients.filter(client => client.type === 'optimizer')

  return (
    <FlexFrame>
      <MemoScrollbar tag='optimizers'>
        <ResponsiveGrid
          rowHeight={480}
          breakpoints={{ lg: 1440, md: 960, sm: 560, xs: 320, xxs: 0 }}
        >
          {optimizers.map(optimizer => (
            <div key={optimizer.id} id={optimizer.id}>
              <Optimizer optimizer={optimizer} sendMessage={sendMessage}/>
            </div>
          ))}
        </ResponsiveGrid>
      </MemoScrollbar>
    </FlexFrame>
  )
}

export default memo(Optimizers)
