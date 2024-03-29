import * as React from 'react'
import * as c from 'classnames'
import * as Dropzone from 'react-dropzone'

import { translate, InjectedTranslateProps } from 'react-i18next'

const s = require('./ImageManager.less')

interface IImage {
  id: string
  fullImageUrl: string
}

export interface IProps extends InjectedTranslateProps, React.Props<any> {
  images: IImage[]
  onFilesDrop(files: File[])
  isUploading: boolean
}

export class ImageManager extends React.Component<IProps, void> {

  public refs: {
    [key: string]: any
    dropzone: any
  }

  private openSelectFile = () => {
    this.refs.dropzone.open()
  }

  private onFileDrop = (files: File[]) => {
    this.props.onFilesDrop(files)
  }

  public render() {
    const { t, images } = this.props

    return (
      <div>
        <Dropzone ref='dropzone' onDrop={this.onFileDrop} accept='image/*' className={ s.dropzone }>
          <div className='row'>
            <div className='col-lg-3 col-md-4 col-xs-6 thumb'>
              {
                this.props.isUploading ? (
                  <div>Uploading</div>
                ) : (
                  <a className={ c('thumbnail', s.uploadImageBtn) } href='javascript:void()'
                    onClick={ this.openSelectFile }
                  >
                    <i className='fa fa-plus' aria-hidden='true'></i>
                    { t('choose_file') }
                  </a>
                )
              }
            </div>
            {
              images.map((image) => (
                <div key={ image.id } className='col-lg-3 col-md-4 col-xs-6 thumb'>
                  <a className='thumbnail' href='javascript:void()'>
                    <img className='img-responsive' src={ image.fullImageUrl } alt />
                  </a>
                </div>
              ))
            }
          </div>
        </Dropzone>
      </div>
    )
  }
}

export default translate()(ImageManager)
