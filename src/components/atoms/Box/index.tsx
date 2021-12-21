import { forwardRef } from 'react'
import * as S from './styles'
import { BoxProps } from './types'

interface BoxPropsComponent extends BoxProps {
  children: React.ReactNode
  as?: any
}

const Box = forwardRef<HTMLDivElement, BoxPropsComponent>(
  (
    {
      alignItems,
      justifyContent,
      flexDirection,
      gap,
      children,
      ...props
    }: BoxPropsComponent,
    ref,
  ) => {
    return (
      <S.BoxContainer
        alignItems={alignItems}
        justifyContent={justifyContent}
        flexDirection={flexDirection}
        gap={gap}
        ref={ref}
        {...props}
      >
        {children}
      </S.BoxContainer>
    )
  },
)

export default Box
