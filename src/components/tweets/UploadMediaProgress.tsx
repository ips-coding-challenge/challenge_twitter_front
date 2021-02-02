import React, { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import {
  uploadMediaFinishedState,
  uploadMediaProgressState,
} from '../../state/mediaState'

const UploadMediaProgress = () => {
  const progress = useRecoilValue(uploadMediaProgressState)
  const finished = useRecoilValue(uploadMediaFinishedState)
  return progress > 0 ? (
    <div className="absolute inset-0">
      <div className="flex items-center justify-center h-full">
        {!finished ? (
          <div
            style={{ width: '200px' }}
            className="bg-black opacity-75 h-2 flex items-center text-sm rounded"
          >
            <div
              style={{ width: `${progress}%` }}
              className="h-full bg-primary rounded"
            ></div>
          </div>
        ) : (
          <div className="text-white bg-black opacity-70 px-3 py-1 rounded-lg text-sm">
            Upload finished!
          </div>
        )}
      </div>
    </div>
  ) : null
}

export default React.memo(UploadMediaProgress)
