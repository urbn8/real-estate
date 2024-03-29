import * as React from 'react'
import { IndexLink } from 'react-router'
import * as classnames from 'classnames'
import { translate, InjectedTranslateProps } from 'react-i18next'

import {Navbar as BootstrapNavbar } from 'react-bootstrap'

const s = require('./Header.less')

export interface IMenuItem {
  url: string
  label: string
}

interface IProps extends InjectedTranslateProps {
  currentCurrency: string
  items: IMenuItem[]
  onSwitchLanguageClicked: () => void
  onSwitchCurrencyClicked: () => void
  onLogoutClick?: () => void
}

function Header(props: IProps) {
  return (
    <BootstrapNavbar className={ s.container } inverse fixedTop>
      <BootstrapNavbar.Header>
        <BootstrapNavbar.Brand>
          <div className={ s.logo } >
            <IndexLink
                to={ '/' }
              >D2 real estate</IndexLink>
          </div>
        </BootstrapNavbar.Brand>
      </BootstrapNavbar.Header>
    <BootstrapNavbar.Collapse>
      <div className={ classnames('nav navbar-right', s.link)}>
        <ul>
          <li>
            <ul>
              {
                props.items.map((item) => (
                  <li key={ item.url } className={ s.menu } >
                    <IndexLink
                      to={ item.url }
                      activeClassName={ s.selected }
                    >{ item.label }</IndexLink>
                  </li>
                ))
              }
            </ul>
          </li>
          <li>
            <a
              href='/languages/switch'
              onClick={ (e) => {
                e.nativeEvent.preventDefault()
                props.onSwitchLanguageClicked()
              }}
            >{
              props.t('switch_language')
            }</a>
          </li>
          <li>
            <a
              href='/currency/switch'
              onClick={ (e) => {
                e.nativeEvent.preventDefault()
                props.onSwitchCurrencyClicked()
              }}
            >
              <p>{ props.t('switch_currency_label') } { props.currentCurrency }</p>
            </a>
          </li>
          {
            props.onLogoutClick ? (
              <li>
                <a
                  href='/logout'
                  onClick={ (e) => {
                    e.nativeEvent.preventDefault()
                    props.onLogoutClick()
                  }}
                >
                  <p>{ props.t('logout') }</p>
                </a>
              </li>
            ) : undefined
          }
        </ul>
      </div>
    </BootstrapNavbar.Collapse>
  </BootstrapNavbar>
  )
}

export default translate()(Header)
