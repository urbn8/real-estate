import * as React from 'react'
import { Form } from 'formsy-react'
import * as FRC from 'formsy-react-components'
import { IOption } from 'formsy-react-components'
import * as _ from 'lodash'
// import * as log from 'loglevel'

import { translate, InjectedTranslateProps } from 'react-i18next'

const { Input, Row, Select } = FRC

const s = require('./Form.less')

import { ICategory } from '../../../../redux/modules/categories/categories.model'
import { translateText } from '../../../../redux/models'
import { salesTypeOptions, facingDirectionOptions, rentalPeriodOptions } from './options'

function translateOptions(options, t): IOption[] {
  return options.map((item) => {
    return Object.assign({}, item, {
      label: t(item.translationKey),
    })
  })
}

export interface IFormData {
  title_in_vietnamese: string
  title_in_english: string
  price_in_vnd?: number
  price_in_usd?: number
  category?: string
  sale_type?: string
  rental_period_value?: number
  rental_period_unit?: string
  available_until?: Date
  facing_direction?: string
  bed_room_count?: number
  size_width?: number
  size_length?: number
}

interface IProps extends InjectedTranslateProps, React.Props<StepBasicInfo> {
  langCode: string
  formData: IFormData
  categories: ICategory[]
  onSubmit(data: IFormData)
  onChange(data: IFormData)
}

const emptyOption = {
  value: '',
  label: '-----',
}

function formatDate(d: Date) {
  const day = ('0' + d.getDate()).slice(-2)
  const month = ('0' + (d.getMonth() + 1)).slice(-2)
  const formated = d.getFullYear() + '-' + (month) + '-' + (day)

  return formated
}

function stringValueOf(v: any) {
  if (_.isNull(v) || _.isUndefined(v)) {
    return ''
  }

  if (_.isDate(v)) {
    const d = v as Date
    return formatDate(d)
  }

  return String(v)
}

class StepBasicInfo extends React.Component<IProps, void> {

  public refs: {
    [key: string]: any
    formsy: any
  }

  constructor(props) {
    super(props)
  }

  private submitForm = (data) => {
    this.props.onSubmit(data)
  }

  public onChange = _.debounce((data) => {
    this.props.onChange(data)
  }, 200)

  public render() {
    const { t, formData } = this.props

    const salesTypes = translateOptions(salesTypeOptions, t)
    salesTypes.unshift(emptyOption)

    const facingDirections = translateOptions(facingDirectionOptions, t)
    facingDirections.unshift(emptyOption)

    const rentalPeriods = translateOptions(rentalPeriodOptions, t)
    rentalPeriods.unshift(emptyOption)

    const categoriesOptions = this.props.categories.map((cat) => {
      return {
        value: cat.id,
        label: translateText(cat.name, this.props.langCode),
      }
    })
    categoriesOptions.unshift(emptyOption)

    return (
      <div className={ s.container }>
        <Form
            className='horizontal'
            ref='formsy'
            onSubmit={ this.submitForm }
            onChange={ this.onChange }
        >
          <fieldset>
            <legend>{ t('step_basic_info') }</legend>
            <Input
              name='title_in_vietnamese'
              value={ formData.title_in_vietnamese }
              label={ t('title_in_vietnamese') }
              type='text'
              placeholder={ t('title_in_vietnamese') }
            />
            <Input
              name='title_in_english'
              value={ formData.title_in_english }
              label={ t('title_in_english') }
              type='text'
              placeholder={ t('title_in_english') }
            />
            <Row layout='horizontal' label={ t('price') }>
              <Input
                labelClassName='hidden'
                name='price_in_vnd'
                value={ stringValueOf(formData.price_in_vnd) }
                type='number'
                placeholder={ t('price_in_vnd') }
                addonAfter={<span>VND</span>}
              />
              {' '}
              <Input
                labelClassName='hidden'
                name='price_in_usd'
                value={ stringValueOf(formData.price_in_usd) }
                type='number'
                placeholder={ t('price_in_usd') }
                addonAfter={<span>USD</span>}
              />
            </Row>
            <Select
              name='category'
              value={ formData.category }
              label={ t('category') }
              options={categoriesOptions}
            />
              <Select
              name='sale_type'
              value={ formData.sale_type }
              label={ t('sale_type') }
              options={salesTypes}
            />
            {
              formData.sale_type === 'rent' ? (
                <Row layout='horizontal' label={ t('rental_period') }>
                  <Input
                    labelClassName='hidden'
                    name='rental_period_value'
                    value={ stringValueOf(formData.rental_period_value) }
                    type='number'
                    placeholder={ t('rental_period_value') }
                  />
                  <Select
                    labelClassName='hidden'
                    name='rental_period_unit'
                    value={ formData.rental_period_unit }
                    placeholder={ t('rental_period_unit') }
                    options={rentalPeriods}
                  />
                </Row>
              ) : undefined
            }
            <Input
              name='available_until]'
              value={ stringValueOf(formData.available_until) }
              label={ t('available_until') }
              type='date'
              placeholder={ t('available_until') }
            />
            <Select
              name='facing_direction'
              value={ formData.facing_direction }
              label={ t('facing_direction') }
              options={facingDirections}
            />
            <Input
              name='bed_room_count'
              value={ stringValueOf(formData.bed_room_count) }
              type='number'
              label={ t('bed_room_count') }
              placeholder={ t('bed_room_count') }
            />
            <Row layout='horizontal' label={ t('size') }>
              <Input
                labelClassName='hidden'
                name='size_width'
                value={ stringValueOf(formData.size_width) }
                type='number'
                placeholder={ t('size_width') }
              />
              <Input
                labelClassName='hidden'
                name='size_length'
                value={ stringValueOf(formData.size_length) }
                type='number'
                placeholder={ t('size_length') }
              />
            </Row>
          </fieldset>
          <fieldset>
            <Row layout='horizontal'>
              <input className='btn btn-primary' formNoValidate={ true } type='submit' defaultValue={ t('ok') } />
            </Row>
          </fieldset>
        </Form>
      </div>
    )
  }
}

export default translate()(StepBasicInfo)
