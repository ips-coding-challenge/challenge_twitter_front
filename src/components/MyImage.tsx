import {
  LazyLoadImage,
  LazyLoadImageProps,
} from 'react-lazy-load-image-component'

export type MyImageProps = {
  src: string
  alt?: string
} & LazyLoadImageProps

const MyImage = ({ src, alt, ...rest }: MyImageProps) => {
  return (
    <LazyLoadImage
      className="h-tweetImage object-cover rounded-lg w-full mt-4"
      src={src}
      alt={alt}
      {...rest}
    />
  )
}

export default MyImage
