import Alert from '../Alert'

type ErrorsProps = {
  errors: any
}

const Errors = ({ errors }: ErrorsProps) => {
  return errors.length > 0 ? (
    <div className="mb-4">
      {errors.map((e: any, index: number) => {
        return (
          <Alert
            key={index}
            variant="danger"
            message={Array.isArray(e) ? e[0].message : e.message}
          />
        )
      })}
    </div>
  ) : null
}

export default Errors
