import { ButtonHTMLAttributes } from 'react'

type ButtonProps = {
  text: string
  variant: string
  icon?: JSX.Element
  alignment?: 'left' | 'right'
} & ButtonHTMLAttributes<HTMLButtonElement>

const classes: any = {
  primary: 'bg-primary text-white hover:bg-primary_hover',
}

const Button = ({
  text,
  variant,
  icon,
  alignment = 'left',
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={`${classes[variant]} flex items-center justify-center px-4 py-2 rounded transition-colors duration-300`}
      {...rest}
    >
      {icon && alignment === 'left' && <div className="mr-2">{icon}</div>}
      {text}
      {icon && alignment === 'right' && <div className="ml-2">{icon}</div>}
    </button>
  )
}

export default Button
