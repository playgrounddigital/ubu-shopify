export const getVimeoPlayerURL = ({
  src,
  loop = true,
  autoplay,
  hasControls = false,
}: {
  src: string
  loop?: boolean
  autoplay?: boolean
  hasControls?: boolean
}) => {
  const match = src.match(/vimeo.com\/(\d+)/)
  const id = match ? match[1] : ''
  return `https://player.vimeo.com/video/${id}?loop=${loop ? '1' : '0'}&${autoplay && !hasControls ? 'background=1&controls=0&muted=1&title=0&byline=0&badge=0' : hasControls ? 'autoplay=1&muted=1&background=0&controls=1&muted=0&title=0&byline=0&badge=0' : 'background=1&controls=0'}`
}
