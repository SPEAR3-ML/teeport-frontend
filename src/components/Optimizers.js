import React, { memo } from 'react'

import { FlexFrame } from './Utils'
import MemoScrollbar from './MemoScrollbar'
import ResponsiveGrid from './ResponsiveGrid'
import ClientCard from './ClientCard'
import StatusBar from './StatusBar'

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
              <ClientCard client={optimizer} sendMessage={sendMessage}/>
            </div>
          ))}
        </ResponsiveGrid>
      </MemoScrollbar>
      <StatusBar
        count={optimizers ? optimizers.length : 0}
        type='optimizer'
        selected={{}}
      />
    </FlexFrame>
  )
}

export default memo(Optimizers)
