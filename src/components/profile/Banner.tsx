import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { MyImageProps } from '../MyImage'

const Banner = ({ src, alt, ...rest }: MyImageProps) => {
  return (
    <LazyLoadImage
      className="h-tweetImage object-cover w-full"
      src={src}
      alt={alt}
      effect="blur"
      {...rest}
    />
  )
}

export default Banner
