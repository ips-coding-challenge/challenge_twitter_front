import axios, { AxiosResponse } from 'axios'
import { useState } from 'react'

interface useUploadFileProps {
  folder?: string
  onUploadProgress: (e: ProgressEvent<EventTarget>, f: File) => void
  onUploadFinished: (e: ProgressEvent<EventTarget>, f: File) => void
  multiple?: boolean
  maxFiles?: number
  maxSize?: number
  fileFormat?: string[]
}

export const useUploadFile = ({
  folder = 'thullo',
  onUploadProgress,
  onUploadFinished,
  multiple = false,
  maxFiles = 1,
  maxSize = 5,
  fileFormat = ['image/jpeg', 'image/jpg', 'image/png'],
}: useUploadFileProps) => {
  const [errors, setErrors] = useState<any[]>([])
  const [isUploading, setIsUploading] = useState<boolean>(false)

  const validateFiles = (files: FileList) => {
    if (files.length > maxFiles) {
      throw new Error(`You cannot upload more than ${maxFiles} files`)
    }

    for (const f of Array.from(files)) {
      if (Math.round(f.size / 1024 / 1024) > maxSize) {
        throw new Error(`You cannot upload file larger than ${maxSize} mb`)
      }
      console.log('f', f)
      if (!fileFormat.includes(f.type)) {
        throw new Error(`Only those file are accepted: ${fileFormat}`)
      }
    }
  }

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
    setIsUploading(true)

    if (file) {
      try {
        const formData = createFormData(file)
        const sendRequest = axios.post(
          process.env.REACT_APP_CLOUDINARY_URL!,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (e: ProgressEvent<EventTarget>) => {
              onUploadProgress(e, file)
            },
            onDownloadProgress: (e: ProgressEvent<EventTarget>) => {
              onUploadFinished(e, file)
              setIsUploading(false)
            },
          }
        )

        return sendRequest
      } catch (e) {
        console.log('Error', e)
        setErrors((errors) => errors.concat(e))
        setIsUploading(false)
      }
    }
  }

  return { uploadFile, errors, isUploading, setIsUploading }
}
