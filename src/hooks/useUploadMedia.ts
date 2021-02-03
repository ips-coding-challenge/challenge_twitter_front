import axios, {
  AxiosResponse,
  CancelTokenSource,
  CancelTokenStatic,
} from 'axios'
import { useState } from 'react'

interface useUploadFileProps {
  folder: string
  onUploadProgress: (e: ProgressEvent<EventTarget>, f: File) => void
  onUploadFinished: (e: ProgressEvent<EventTarget>, f: File) => void
  multiple?: boolean
  maxFiles?: number
  maxSize?: number
  fileFormat?: string[]
}

export const useUploadFile = ({
  folder,
  onUploadProgress,
  onUploadFinished,
  multiple = false,
  maxFiles = 1,
  maxSize = 5,
  fileFormat = ['image/jpeg', 'image/jpg', 'image/png'],
}: useUploadFileProps) => {
  const [data, setData] = useState<any>(null)
  const [errors, setErrors] = useState<any[]>([])
  const [uploading, setUploading] = useState<boolean>(false)
  const [source, setSource] = useState<CancelTokenSource | null>(null)

  const createFormData = (file: any) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append(
      'upload_preset',
      process.env.REACT_APP_CLOUDINARY_UNSIGNED_PRESET!
    )
    formData.append('folder', folder)
    formData.append('multiple', multiple ? 'true' : 'false')
    return formData
  }

  const uploadFile = async (file: any) => {
    setErrors([])
    setUploading(true)

    if (file) {
      try {
        const formData = createFormData(file)
        const cancelToken = axios.CancelToken
        const source = cancelToken?.source()
        setSource(source)
        const res = await axios.post(
          process.env.REACT_APP_CLOUDINARY_URL!,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            cancelToken: source.token,
            onUploadProgress: (e: ProgressEvent<EventTarget>) => {
              try {
                onUploadProgress(e, file)
              } catch (e) {
                console.log('error onUploadProgress', e)
                setErrors((old) => old.concat(e.message))
              }
            },
            onDownloadProgress: (e: ProgressEvent<EventTarget>) => {
              try {
                onUploadFinished(e, file)
                setUploading(false)
              } catch (e) {
                console.log('error onDownloadProgress', e.message)
                setErrors((old) => old.concat(e.message))
              }
            },
          }
        )

        setData(res.data)
      } catch (e) {
        if (axios.isCancel(e)) {
          console.log('Request canceled', e.message)
        }
        console.log('Error from the hook', e)
        setErrors((errors) => errors.concat(e))
        setUploading(false)
      }
    }
  }

  return { uploadFile, data, errors, uploading, source }
}
