import * as React from 'react'
import * as c from 'classnames'
import * as log from 'loglevel'
import * as urljoin from 'url-join'
import { Image } from 'react-bootstrap'
import { translate, InjectedTranslateProps } from 'react-i18next'
import { Row } from 'react-bootstrap'

import UploadImageModal from '../../../UploadImageModal/UploadImageModal'

import { IImage } from '../../../../redux/modules/images/images.model'

const s = require('./StepSelectThumbnail.less')

interface IProps extends InjectedTranslateProps {
  langCode: string
  image?: IImage
  onImageUploaded(image: IImage)
  onNext()
}

interface IState {
  showModal: boolean
}

class StepBasicInfo extends React.Component<IProps, IState> {

  constructor(props) {
    super(props)

    this.state = {
      showModal: false,
    }
  }

  public showUploadImageModal = () => {
    this.setState({
      showModal: true,
    })
  }

  public hideUploadImageModal = () => {
    this.setState({
      showModal: false,
    })
  }

  public onImageUploaded = (image: IImage) => {
    log.debug('uploaded image: ', image)
    this.setState({
      showModal: false,
    })

    this.props.onImageUploaded(image)
  }

  public render() {

    const { t } = this.props

    return (
      <div>
        {
          this.props.image ? (
            <Image src={
              urljoin(window.__CONFIG__.imageRootUrl, this.props.image.fileName)
            } thumbnail className={ s.imageHolder }
              onClick={ this.showUploadImageModal }
            />
          ) : (
            <div className={ c('well', s.imageHolder) } onClick={ this.showUploadImageModal }>
              { t('upload_image') }
            </div>
          )
        }
        <form>
          <fieldset>
            <Row layout='horizontal'>
              <input className='btn btn-primary'
                formNoValidate={ true } type='submit' defaultValue='Ok'
                onClick={ this.props.onNext }
              />
            </Row>
          </fieldset>
        </form>
        <UploadImageModal
          show={ this.state.showModal }
          onImageUploaded={ this.onImageUploaded }
          onHideClicked={ this.hideUploadImageModal }
        />
      </div>
    );
  }
}

export default translate()(StepBasicInfo)
