import React from 'react'
import {Decorator as FormsyElement} from 'formsy-react'
import { connect } from 'mobx-connect'
import { FormControl as BootstrapControl} from 'react-bootstrap'

const s = require('./Input.less')

function Input(props) {
  function onChange(e) {
    props.setValue(e.target.value)
    if (props.onChange) {
      props.onChange(e.target.value)
    }
  }

  return (
    <BootstrapControl className={ s.container } type="text" placeholder={ props.placeholder }
      onChange={ onChange }/>
  )
}

Input.propTypes = {
  value: React.PropTypes.string,
  placeholder: React.PropTypes.string
}


export default FormsyElement()(connect(Input))
