import { ButtonHTMLAttributes } from 'react'

type ButtonProps = {
  text: string
  variant: string
  icon?: JSX.Element
  alignment?: 'left' | 'right'
  className?: string
  hideTextOnMobile?: boolean
  loading?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const classes: any = {
  primary: 'bg-primary text-white hover:bg-primary_hover',
  default: 'bg-transparent text-gray5 hover:bg-gray2',
  red: 'text-red1',
  blue: 'text-blue2',
  green: 'text-green2',
}

const Button = ({
  text,
  variant,
  icon,
  alignment = 'left',
  className,
  hideTextOnMobile = false,
  loading = false,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={`${classes[variant]} flex items-center justify-center px-4 py-2 rounded transition-colors duration-300 ${className}`}
      {...rest}
    >
      {icon && alignment === 'left' && <div className="mr-2">{icon}</div>}
      <div className={`${hideTextOnMobile ? 'hidden md:block' : ''}`}>
        {text}
      </div>
      {icon && alignment === 'right' && <div className="ml-2">{icon}</div>}

      {loading && <div className="loader loader-white ml-2"></div>}
    </button>
  )
}

export default Button
