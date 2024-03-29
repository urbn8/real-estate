import * as React from 'react'
import { Row } from 'react-bootstrap'
import { translate, InjectedTranslateProps } from 'react-i18next'

import Icon from '../Icon/Icon'
import ButtonIcon from '../ButtonIcon/ButtonIcon'

const s = require('./Footer.less')

function Footer(props: InjectedTranslateProps) {
  const { t } = props

  return (
    <div className={ 'container' }>
      <div className={ s.container }>
        <div className={ s.left }>
          <ul className={ s.items }>
            <li className={ s.phone }>
              <div>
                <Icon icon='phone' />
              </div>
              <div dangerouslySetInnerHTML={{__html: t('footer_phone_info')}}>
              </div>
            </li>
            <li>
              <Icon icon='envelope' />
              <p>d2realstate@gmail.com</p>
            </li>
          </ul>
        </div>
        <div className={ s.right }>
          <Row className={ s.share }>
            <div className={ s.button } >
              <a href='https://www.facebook.com/sonia.tran.716' target='_blank'>
                <ButtonIcon icon='facebook'/>
              </a>
            </div>
            <div className={ s.button } >
              <ButtonIcon icon='facebook' text='share'/>
            </div>
          </Row>
          <p dangerouslySetInnerHTML={{__html: t('footer_copyright')}}></p>
        </div>
      </div>
    </div>
  )
}

export default translate()(Footer)
