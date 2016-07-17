import React from 'react'
import Select from 'react-select'
import {Decorator as FormsyElement} from 'formsy-react'
import { connect } from 'mobx-connect'
import { toJS } from 'mobx'
import log from 'loglevel'

const s = require('./Dropdown.less')

function Dropdown(props) {
  function onChange(selected) {
    let value
    if (selected) {
      value = selected.value
    }

    props.setValue(value)
    if (props.onChange) {
      props.onChange(value)
    }
  }

  return (
    <div className={ s.container }>
      <Select
        className={ s.dropdown }
        name={ `dropdown-${ props.name }` }
        value={ props.getValue() }
        options={ toJS(props.options) }
        onChange={ onChange }
      />
    </div>
  )
}

Dropdown.propTypes = {
  title: React.PropTypes.string.isRequired,
  options: React.PropTypes.object.isRequired,
}

export default FormsyElement()(connect(Dropdown))

