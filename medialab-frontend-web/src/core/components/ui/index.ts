// Export all UI components
export { default as Button } from './Button'
export { default as Card } from './Card'
export { default as Input } from './Input'
export { default as Select } from './Select'
export { default as Textarea } from './Textarea'
export { default as Badge } from './Badge'
export { default as StatCard } from './StatCard'
export { default as Modal } from './Modal'
export { default as SlideIn } from './SlideIn'
export { default as Calendar } from './Calendar'

export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from './Table'

// Common types for components
export interface TableColumn<T = any> {
  key: string
  title: string
  dataIndex?: string
  render?: (value: any, record: T, index: number) => React.ReactNode
  sortable?: boolean
  width?: string | number
  align?: 'left' | 'center' | 'right'
}

export interface TableData {
  [key: string]: any
}

// Select types
export type { SelectOption } from './Select'

// Utility types
export interface PaginationConfig {
  current: number
  pageSize: number
  total: number
  showSizeChanger?: boolean
  showQuickJumper?: boolean
  onChange: (page: number, pageSize: number) => void
}