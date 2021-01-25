const Preview = ({ preview }: any) => {
  return (
    <a
      href={preview.url}
      className="rounded shadow block p-3 hover:bg-gray3 transition-colors duration-300"
    >
      {preview.image && (
        <img
          className="rounded object-cover w-full"
          src={preview.image}
          alt={preview.title}
        />
      )}
      <h4 className="font-semibold my-2">{preview.title}</h4>
      {preview.description && <p>{preview.description}</p>}
    </a>
  )
}

export default Preview
