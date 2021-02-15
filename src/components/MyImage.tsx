import {
  LazyLoadImage,
  LazyLoadImageProps,
} from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

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
      effect="blur"
      {...rest}
    />
  )
}

export default MyImage
