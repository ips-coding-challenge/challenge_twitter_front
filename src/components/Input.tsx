import { forwardRef, InputHTMLAttributes } from 'react'

type InputProps = {
  icon?: JSX.Element
  error?: string
  label?: string
} & InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef(
  ({ icon, error, label, ...rest }: InputProps, ref: any) => {
    return (
      <div className="mb-4">
        {label && (
          <label className="text-sm" htmlFor={rest.name}>
            {label}
          </label>
        )}
        <div className="bg-gray1 flex items-center border px-2 py-1 border-gray2 rounded-lg ">
          {icon}

          <input
            id={rest.name}
            style={{ minWidth: 0 }}
            className="bg-transparent placeholder-gray4 ml-2 w-full h-full p-2 rounded-lg"
            {...rest}
            ref={ref}
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    )
  }
)

export default Input
