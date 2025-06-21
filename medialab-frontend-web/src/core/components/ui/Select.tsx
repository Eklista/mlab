import { forwardRef, useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown, Check } from 'lucide-react'
import { clsx } from 'clsx'

export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
  description?: string
}

interface SelectProps {
  label?: string
  placeholder?: string
  value?: string | number
  defaultValue?: string | number
  options: SelectOption[]
  error?: string
  helperText?: string
  disabled?: boolean
  onChange?: (value: string | number) => void
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const Select = forwardRef<HTMLDivElement, SelectProps>(
  ({ 
    label,
    placeholder = 'Seleccionar...',
    value,
    defaultValue,
    options,
    error,
    helperText,
    disabled = false,
    onChange,
    size = 'md',
    className,
    ...props
  }, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState(value || defaultValue || '')
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 })
    const selectRef = useRef<HTMLDivElement>(null)

    const selectedOption = options.find(option => option.value === selectedValue)

    useEffect(() => {
      if (isOpen && selectRef.current) {
        const rect = selectRef.current.getBoundingClientRect()
        setDropdownPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width
        })
      }
    }, [isOpen])

    const handleSelect = (option: SelectOption) => {
      if (option.disabled) return
      
      setSelectedValue(option.value)
      onChange?.(option.value)
      setIsOpen(false)
    }

    const baseStyles = 'relative w-full bg-zinc-800/50 border border-zinc-700 text-white rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 cursor-pointer'
    const errorStyles = 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
    const disabledStyles = 'opacity-50 cursor-not-allowed'

    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-sm',
      lg: 'px-4 py-4 text-base'
    }

    return (
      <div ref={ref} className={clsx('space-y-2', className)} {...props}>
        {label && (
          <label className="block text-sm font-medium text-zinc-300">
            {label}
          </label>
        )}
        
        <div ref={selectRef} className="relative">
          <div
            className={clsx(
              baseStyles,
              error && errorStyles,
              disabled && disabledStyles,
              sizes[size]
            )}
            onClick={() => !disabled && setIsOpen(!isOpen)}
          >
            <div className="flex items-center justify-between">
              <span className={clsx(
                selectedOption ? 'text-white' : 'text-zinc-400'
              )}>
                {selectedOption ? selectedOption.label : placeholder}
              </span>
              <ChevronDown className={clsx(
                'w-4 h-4 text-zinc-400 transition-transform duration-200',
                isOpen && 'rotate-180'
              )} />
            </div>
          </div>
        </div>

        {/* Portal para el dropdown */}
        {isOpen && !disabled && createPortal(
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-[9998]"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Options */}
            <div 
              className="fixed bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl z-[9999] max-h-60 overflow-auto"
              style={{
                top: dropdownPosition.top + 4,
                left: dropdownPosition.left,
                width: dropdownPosition.width
              }}
            >
              {options.map((option, index) => (
                <div
                  key={index}
                  className={clsx(
                    'px-4 py-3 cursor-pointer transition-colors flex items-center justify-between',
                    option.disabled 
                      ? 'text-zinc-500 cursor-not-allowed' 
                      : 'text-white hover:bg-zinc-700',
                    selectedValue === option.value && 'bg-zinc-700'
                  )}
                  onClick={() => handleSelect(option)}
                >
                  <div>
                    <div className="font-medium">{option.label}</div>
                    {option.description && (
                      <div className="text-sm text-zinc-400">{option.description}</div>
                    )}
                  </div>
                  {selectedValue === option.value && (
                    <Check className="w-4 h-4 text-white" />
                  )}
                </div>
              ))}
            </div>
          </>,
          document.body
        )}
        
        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}
        
        {helperText && !error && (
          <p className="text-sm text-zinc-400">{helperText}</p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
export default Select