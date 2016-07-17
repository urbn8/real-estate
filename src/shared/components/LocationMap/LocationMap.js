import React from 'react'
import GoogleMap from 'google-map-react'
import { connect } from 'mobx-connect'

import Block from '../Block/Block'

const s = require('./LocationMap.less')

function LocationMap(props) {
  const { store: { locale: { languageCode } } } = this.context

  return (
    <Block title='We are here' noBorder={ true }>
      <div className={ s.container }>
        <GoogleMap
          bootstrapURLKeys={{
            key: window.CONFIG.googleMapAPIKey,
            language: languageCode,
          }}
          center={ props.center }
          zoom={ props.zoom }>
        </GoogleMap>
      </div>
    </Block>
  )
}

LocationMap.propTypes = {
  center: React.PropTypes.object,
  zoom: React.PropTypes.integer,
}
// 10.7859378,106.5255811
LocationMap.defaultProps = {
  center: {lat: 10.7859378, lng: 106.5255811},
  zoom: 12,
  // coords: {lat: 59.724465, lng: 30.080121}
}

export default connect(LocationMap)
