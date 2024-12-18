declare module 'react-sortablejs' {
  import type { ReactNode } from 'react'
  import { Component } from 'react'

  interface SortableProps {
    tag?: string
    onChange?: (order: string[]) => void
    options?: object
    className?: string
    style?: React.CSSProperties
    children?: ReactNode
  }

  export default class Sortable extends Component<SortableProps> {}
}
