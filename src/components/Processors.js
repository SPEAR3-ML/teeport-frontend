import React, { memo } from 'react'

import { FlexFrame } from './Utils'
import MemoScrollbar from './MemoScrollbar'
import ResponsiveGrid from './ResponsiveGrid'
import ClientCard from './ClientCard'
import StatusBar from './StatusBar'

const Processors = ({ clients, sendMessage }) => {
  const processors = clients.filter(client => client.type === 'processor')

  return (
    <FlexFrame>
      <MemoScrollbar tag='processors'>
        <ResponsiveGrid
          rowHeight={480}
          breakpoints={{ lg: 1440, md: 960, sm: 560, xs: 320, xxs: 0 }}
        >
          {processors.map(processor => (
            <div key={processor.id} id={processor.id}>
              <ClientCard client={processor} sendMessage={sendMessage}/>
            </div>
          ))}
        </ResponsiveGrid>
      </MemoScrollbar>
      <StatusBar
        count={processors ? processors.length : 0}
        type='processor'
        selected={{}}
      />
    </FlexFrame>
  )
}

export default memo(Processors)
