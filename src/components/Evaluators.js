import React, { memo } from 'react'

import { FlexFrame } from './Utils'
import MemoScrollbar from './MemoScrollbar'
import ResponsiveGrid from './ResponsiveGrid'
import Evaluator from './Evaluator'

const Evaluators = ({ clients, sendMessage }) => {
  const evaluators = clients.filter(client => client.type === 'evaluator')

  return (
    <FlexFrame>
      <MemoScrollbar tag='evaluators'>
        <ResponsiveGrid
          rowHeight={480}
          breakpoints={{ lg: 1440, md: 960, sm: 560, xs: 320, xxs: 0 }}
        >
          {evaluators.map(evaluator => (
            <div key={evaluator.id} id={evaluator.id}>
              <Evaluator evaluator={evaluator} sendMessage={sendMessage}/>
            </div>
          ))}
        </ResponsiveGrid>
      </MemoScrollbar>
    </FlexFrame>
  )
}

export default memo(Evaluators)
