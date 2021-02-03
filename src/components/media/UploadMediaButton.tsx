import { ButtonHTMLAttributes } from 'react'

type UploadMediaButtonProps = {
  icon: JSX.Element
  onClick:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

const UploadMediaButton = ({
  icon,
  onClick,
  className,
}: UploadMediaButtonProps) => {
  return (
    <div
      className={`w-8 h-8 p-1 rounded bg-black opacity-70 flex items-center justify-center ${className}`}
      onClick={onClick}
    >
      {icon}
    </div>
  )
}

export default UploadMediaButton
