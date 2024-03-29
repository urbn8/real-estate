import * as React from 'react'

import Button from '../Button/Button'

const s = require('./Info.less')

function Info(props) {
  function onClick() {
    props.onClick()
  }
  return (
    <div className={ s.container }>
      { props.children }
      <div className={ s.button }>
          <Button text={ props.btnText } onClick={ onClick } active={ props.active }/>
      </div>
    </div>
  )
}
export default Info
