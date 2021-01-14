const classes = {
  success: 'bg-green-100 text-green-500',
  danger: 'bg-red-100 text-red-500',
}

type AlertProps = {
  variant: 'success' | 'danger'
  message: string
}

const Alert = ({ variant, message }: AlertProps) => {
  return (
    <div className={`${classes[variant]} px-4 py-2 w-full rounded`}>
      {message}
    </div>
  )
}

export default Alert
