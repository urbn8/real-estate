import React from 'react'
import log from 'loglevel'
import { connect } from 'mobx-connect'

import Input from 'components/FormElements/Input/Input'
import IntegerInput from 'components/FormElements/IntegerInput/IntegerInput'
import FloatInput from 'components/FormElements/FloatInput/FloatInput'
import RichEditor from 'components/FormElements/RichEditor/RichEditor'
import Dropdown from 'components/FormElements/Dropdown/Dropdown'
import DatePicker from 'components/FormElements/DatePicker/DatePicker'
import LocationMap from 'components/LocationMap/LocationMap'

import {
  Grid, Row, Col,
  FormGroup, ControlLabel, FormControl, HelpBlock,
  Checkbox, Button,
} from 'react-bootstrap'

function formDataToProperty(form) {

}

function PropertyEdit(props) {

  const { store } = this.context
  const salesTypes = store.salesTypes.options
  const directions = store.directions.options
  const rentalPeriods = store.rentalPeriods.options
  const { formData, categories } = props

  function submit(model) {
    log.debug('submit model', model)


  }

  return (
    <div>
      <Formsy.Form onSubmit={ submit }>
        <Grid>
          <Row>
            <Col xs={6}>
              <FormGroup>
                <ControlLabel>Name (in Vietnamese)</ControlLabel>
                <Input name="nameVN" value={ formData.nameVN }/>
                <FormControl.Feedback />
                <HelpBlock>This field is required</HelpBlock>
              </FormGroup>
            </Col>
            <Col xs={6}>
              <FormGroup
                controlId="formBasicText"
              >
                <ControlLabel>Name (in English)</ControlLabel>
                <Input name="nameEN" value={ formData.nameEN }/>
                <FormControl.Feedback />
                <HelpBlock>This field is required</HelpBlock>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <FormGroup>
                <ControlLabel>Description (in Vietnamese)</ControlLabel>
                <RichEditor name="descVN" value={ formData.descVN }/>
              </FormGroup>
            </Col>
            <Col xs={6}>
              <FormGroup>
                <ControlLabel>Description (in English)</ControlLabel>
                <RichEditor name="descEN" value={ formData.descEN }/>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <FormGroup>
                <ControlLabel>Category</ControlLabel>
                <Dropdown name='categoryID' title='Category'
                  options={ categories }
                  value={ formData.categoryID } />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <FormGroup>
                <ControlLabel>Sales type</ControlLabel>
                <Dropdown name='salesType' title='Sales type'
                  options={ salesTypes }
                  value={ formData.salesType } />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <FormGroup>
                <ControlLabel>Available Until</ControlLabel>
                <DatePicker name='availableUntil'
                  value={formData.availableUntil} />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <FormGroup>
                <ControlLabel>Facing direction</ControlLabel>
                <Dropdown name='facingDirection' title='Facing direction'
                  options={ directions }
                  value={ formData.facingDirection } />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <FormGroup>
                <ControlLabel>Number of bed rooms</ControlLabel>
                <IntegerInput name="bedRoomCount"
                  value={ formData.bedRoomCount }/>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <FormGroup>
                <ControlLabel>Size (width x length)</ControlLabel>
                <Row>
                  <Col xs={2}>
                    <IntegerInput name="sizeWidth" value={ formData.sizeWidth }
                    />
                  </Col>
                  <Col xs={2}>
                    <IntegerInput name="sizeLength" value={ formData.sizeLength }
                    />
                  </Col>
                </Row>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <FormGroup>
                <ControlLabel>Rental Period</ControlLabel>
                <Row>
                  <Col xs={2}>
                    <IntegerInput name="rentalPeriodValue" value={ formData.rentalPeriodValue }
                    />
                  </Col>
                  <Col xs={2}>
                    <Dropdown name='rentalPeriodUnit' title='Rental period unit'
                      options={ rentalPeriods }
                      value={ formData.categoryID }
                    />
                  </Col>
                </Row>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <FormGroup>
                <ControlLabel>Price (VND)</ControlLabel>
                <FloatInput name="priceVN" value={ formData.priceVN }
                />
              </FormGroup>
            </Col>
            <Col xs={4}>
              <FormGroup>
                <ControlLabel>Price (USD)</ControlLabel>
                <FloatInput name="priceEN" value={ formData.priceEN }
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <FormGroup>
                <ControlLabel>Address</ControlLabel>
                <Row>
                  <Col xs={9}>
                    <Input name="name" value={ formData.name }
                      onChange={ (value) => store.updateAdminPropertyValue('name', value) }
                    />
                  </Col>
                  <Col xs={3}>
                    <Checkbox>Hide this information from visistors</Checkbox>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <LocationMap />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <FormGroup>
                <Checkbox>Display this property to the visistors</Checkbox>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Button type="submit">
                Save
              </Button>
            </Col>
          </Row>
        </Grid>
      </Formsy.Form>
    </div>
  )
}

PropertyEdit.propTypes = {
  formData: React.PropTypes.object.isRequired,
  categories: React.PropTypes.object.isRequired,
}

export default connect(PropertyEdit)

