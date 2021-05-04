import Button from '../../Button'

type TweetActionButton = {
  id: number
  isSth: boolean | undefined
  icon: JSX.Element
  activeIcon?: JSX.Element
  text: string
  activeText: string
  activeClass: string
  onClick:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined
}

const TweetActionButton = ({
  id,
  isSth,
  icon,
  activeIcon,
  text,
  activeText,
  activeClass,
  onClick,
}: TweetActionButton) => {
  return (
    <Button
      text={`${isSth ? activeText : text}`}
      variant={`${isSth ? activeClass : 'default'}`}
      className={`text-lg md:text-sm`}
      onClick={(e) => {
        e.stopPropagation()
        onClick ? onClick(e) : null
      }}
      icon={isSth && activeIcon ? activeIcon : icon}
      alignment="left"
      hideTextOnMobile={true}
    />
  )
}

export default TweetActionButton
