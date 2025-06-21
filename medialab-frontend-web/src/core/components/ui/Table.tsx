import { forwardRef } from 'react'
import { clsx } from 'clsx'

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {}

interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  hover?: boolean
}

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {}

const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, ...props }, ref) => (
    <div className="relative overflow-auto rounded-lg bg-zinc-900/50 border border-zinc-700/50">
      <table
        ref={ref}
        className={clsx('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  )
)

const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => (
    <thead
      ref={ref}
      className={clsx(
        '[&_tr]:border-b bg-zinc-800/50 border-zinc-700/50',
        className
      )}
      {...props}
    />
  )
)

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      className={clsx('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  )
)

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, hover = true, ...props }, ref) => (
    <tr
      ref={ref}
      className={clsx(
        'border-b border-zinc-700/50 transition-colors',
        hover && 'hover:bg-zinc-800/30',
        className
      )}
      {...props}
    />
  )
)

const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={clsx(
        'h-12 px-4 text-left align-middle font-medium text-zinc-300 [&:has([role=checkbox])]:pr-0',
        className
      )}
      {...props}
    />
  )
)

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={clsx(
        'p-4 align-middle text-zinc-200 [&:has([role=checkbox])]:pr-0',
        className
      )}
      {...props}
    />
  )
)

Table.displayName = 'Table'
TableHeader.displayName = 'TableHeader'
TableBody.displayName = 'TableBody'
TableRow.displayName = 'TableRow'
TableHead.displayName = 'TableHead'
TableCell.displayName = 'TableCell'

export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
}