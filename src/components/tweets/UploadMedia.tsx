import { AxiosResponse } from 'axios'
import 'cropperjs/dist/cropper.css'
import { CSSProperties, useEffect, useState } from 'react'
import { Cropper } from 'react-cropper'
import { MdCancel, MdCloudUpload, MdEdit } from 'react-icons/md'
import { useRecoilState } from 'recoil'
import { useUploadFile } from '../../hooks/useUploadMedia'
import { uploadMediaState } from '../../state/mediaState'
import Button from '../Button'

const imageStyle: CSSProperties = {
  maxHeight: '300px',
  width: '100%',
  objectFit: 'cover',
}

const UploadMedia = () => {
  // Global State
  const [uploadMediaFile, setUploadMediaFile] = useRecoilState(uploadMediaState)

  const [src, setSrc] = useState('')
  const [show, setShow] = useState(false)
  const [cropper, setCropper] = useState<any>()
  const [cropData, setCropData] = useState('')
  const [progress, setProgress] = useState(0)

  const { uploadFile, errors, isUploading } = useUploadFile({
    folder: 'tweeter/medias',
    onUploadProgress: (e, f) => {
      console.log('onUploadProgress called')
      setProgress(() => Math.floor((e.loaded / e.total) * 100))
    },
    onUploadFinished: (e, f) => {
      console.log('onUploadFinished called')
    },
  })

  // Extract the url to have a base64 image to preview
  const extractUrl = (file: any) =>
    new Promise((resolve) => {
      let src
      const reader = new FileReader()
      reader.onload = (e: any) => {
        src = e.target.result
        resolve(src)
      }
      reader.readAsDataURL(file)
    })

  // get the result from the crop
  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      setCropData(cropper.getCroppedCanvas().toDataURL())
    }
  }

  const sendImage = async () => {
    const res = await uploadFile(cropData.length ? cropData : src)

    if (res) {
      const finalUrl = `https://res.cloudinary.com/trucmachin/image/upload/w_800/v1607022210/${res.data.public_id}.${res.data.format}`
      console.log('finalURL', finalUrl)
    }
  }

  // I extract the preview image when a file is selected
  // The uploadeMediaFile is triggered by the the TweetForm input file component
  useEffect(() => {
    const extractPreview = async () => {
      const src: any = await extractUrl(uploadMediaFile)
      setSrc(src)
    }
    if (uploadMediaFile) {
      extractPreview()
    }
  }, [uploadMediaFile])

  return (
    <div className="my-2">
      {src.length ? (
        <div>
          {!show ? (
            <div className="flex">
              {progress > 0 && <div>{progress}% uploaded</div>}
              <div>
                <MdCancel
                  className="image-actions"
                  onClick={() => {
                    setCropData('')
                    setSrc('')
                    setUploadMediaFile(null)
                  }}
                />
              </div>

              <img
                style={imageStyle}
                className="rounded-lg mx-2"
                src={cropData ? cropData : src}
                onClick={() => setShow(true)}
              />
              <div>
                <MdEdit
                  className="image-actions mb-2"
                  onClick={() => setShow(true)}
                />
                <MdCloudUpload
                  className="image-actions"
                  onClick={() => {
                    sendImage()
                  }}
                />
              </div>
            </div>
          ) : (
            <Cropper
              style={imageStyle}
              className="rounded-lg"
              initialAspectRatio={1}
              src={src}
              viewMode={1}
              guides={true}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              onInitialized={(instance) => {
                setCropper(instance)
              }}
            />
          )}
          {show && (
            <div className="flex items-center">
              <Button
                variant="primary"
                className="mt-2 mr-2"
                text="Apply"
                onClick={() => {
                  getCropData()
                  setShow(false)
                }}
              />
              <Button
                variant="default"
                className="mt-2"
                text="Cancel"
                onClick={() => {
                  setShow(false)
                  setCropData('')
                }}
              />
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}

export default UploadMedia
