import 'cropperjs/dist/cropper.css'
import { CSSProperties, useEffect, useState } from 'react'
import { Cropper } from 'react-cropper'
import { MdCancel, MdCloudUpload, MdEdit } from 'react-icons/md'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { finished } from 'stream'
import { useUploadFile } from '../../hooks/useUploadMedia'
import {
  uploadMediaFinishedState,
  uploadMediaProgressState,
  uploadMediaState,
  uploadMediaUrlState,
} from '../../state/mediaState'
import Button from '../Button'
import UploadMediaButton from './UploadMediaButton'
import UploadMediaProgress from './UploadMediaProgress'

const imageStyle: CSSProperties = {
  maxHeight: '300px',
  width: '100%',
  objectFit: 'cover',
}

const UploadMedia = () => {
  // Global State
  const [uploadMediaFile, setUploadMediaFile] = useRecoilState(uploadMediaState)
  const setUploadMediaProgress = useSetRecoilState(uploadMediaProgressState)
  const setUploadMediaURL = useSetRecoilState(uploadMediaUrlState)
  const [uploadFinished, setUploadFinished] = useRecoilState(
    uploadMediaFinishedState
  )

  const [src, setSrc] = useState('')
  const [show, setShow] = useState(false)
  const [cropper, setCropper] = useState<any>()
  const [cropData, setCropData] = useState('')

  const { uploadFile, data, uploading, errors, source } = useUploadFile({
    folder: 'tweeter/medias',
    onUploadProgress: (e, f) => {
      // 95 instead of 100 because there is a slight delay
      // to go to onUploadProgress to onUploadFinished
      // It's more a UX thing...
      setUploadMediaProgress(Math.floor((e.loaded / e.total) * 95))
    },
    onUploadFinished: (e, f) => {
      setUploadMediaProgress(100)
      setUploadFinished(true)
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

  useEffect(() => {
    if (data) {
      const finalURL = `https://res.cloudinary.com/trucmachin/image/upload/w_800/v1607022210/${data.public_id}.${data.format}`
      setUploadMediaURL(finalURL)
    }
  }, [data])

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

  useEffect(() => {
    console.log('errors from the uploadMedia useEffect', errors)
  }, [errors])

  const cancel = () => {
    setCropData('')
    setSrc('')
    setUploadMediaFile(null)
    setUploadMediaProgress(0)
    setUploadFinished(false)
    if (!finished) {
      source?.cancel('Upload canceled')
    }
  }

  return (
    <div className="my-2">
      {src.length ? (
        <div>
          {!show ? (
            <div className="flex">
              <div className="relative w-full h-auto mx-2">
                <img
                  style={imageStyle}
                  className="rounded-lg"
                  src={cropData ? cropData : src}
                  onClick={() => setShow(true)}
                />
                <UploadMediaProgress />
                {/* Cancel Button */}
                <div className="absolute top-4 left-4">
                  <UploadMediaButton
                    icon={<MdCancel className="media-action" />}
                    onClick={cancel}
                  />
                </div>

                {/* Edit and Upload Button */}
                {!uploadFinished && !uploading && (
                  <div className="absolute top-4 right-4 flex flex-col">
                    <UploadMediaButton
                      icon={<MdEdit className="media-action" />}
                      onClick={() => {
                        setShow(true)
                        setUploadMediaProgress(0)
                      }}
                    />
                    <UploadMediaButton
                      className="mt-2"
                      icon={<MdCloudUpload className="media-action" />}
                      onClick={() => {
                        uploadFile(cropData.length ? cropData : src)
                      }}
                    />
                    {/* <MdEdit
                      className="media-action mb-2"
                      onClick={() => {
                        setShow(true)
                        setUploadMediaProgress(0)
                      }}
                    />

                    <MdCloudUpload
                      className="media-action"
                      onClick={() => {
                        uploadFile(cropData.length ? cropData : src)
                      }}
                    /> */}
                  </div>
                )}
              </div>

              {/* {!uploadFinished && (
                <div>
                  <MdEdit
                    className="image-actions mb-2"
                    onClick={() => {
                      setShow(true)
                      setUploadMediaProgress(0)
                    }}
                  />

                  <MdCloudUpload
                    className="image-actions"
                    onClick={() => {
                      uploadFile(cropData.length ? cropData : src)
                    }}
                  />
                </div>
              )} */}
            </div>
          ) : (
            <Cropper
              style={imageStyle}
              className="rounded-lg"
              initialAspectRatio={1}
              src={src}
              zoomable={false}
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
