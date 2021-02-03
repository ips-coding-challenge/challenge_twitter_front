import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

type MyImageProps = {
  src: string
  alt?: string
}

const MyImage = ({ src, alt }: MyImageProps) => {
  return (
    <LazyLoadImage
      className="h-tweetImage object-cover rounded-lg w-full mt-4"
      src={src}
      alt={alt}
      effect="blur"
    />
  )
}

export default MyImage
