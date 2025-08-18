import cx from 'classnames'
import { DetailedHTMLProps, ForwardRefRenderFunction, HTMLAttributes, ReactNode, forwardRef } from 'react'

interface ContainerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  noPadding?: boolean // all devices
  noPaddingDesktop?: boolean
  noPaddingTablet?: boolean
  noPaddingMobile?: boolean
  className?: string
  children?: ReactNode
}

const Container: ForwardRefRenderFunction<HTMLDivElement, ContainerProps> = (
  { noPadding, noPaddingDesktop, noPaddingTablet, noPaddingMobile, className, children, ...props },
  ref
) => (
  <div
    ref={ref}
    className={cx('relative mx-auto w-full max-w-[1440px]', className, {
      'lg:px-10': !noPaddingDesktop && !noPadding,
      'md:px-6': !noPaddingTablet && !noPadding && !noPaddingDesktop,
      'px-4': !noPaddingMobile && !noPadding,
    })}
    {...props}
  >
    {children}
  </div>
)

export default forwardRef(Container)
