import * as React from 'react'
const FontAwesome = require('react-fontawesome')

const s = require('./Icon.less')

function Icon(props) {
  return (
    <div className={ props.color ? props.color : s.container}>
      <FontAwesome  name={ props.icon } />
    </div>
  )
}

// Icon.propTypes = {
//   icon: React.PropTypes.string.isRequired,
//   color: React.PropTypes.string,
// }

export default Icon
