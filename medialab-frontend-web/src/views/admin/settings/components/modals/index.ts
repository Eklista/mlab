// src/views/admin/settings/components/modals/index.ts
export { default as EmailConfigModal } from './general/EmailConfigModal'
export { default as SystemConfigModal } from './general/SystemConfigModal'
export { default as UploadsConfigModal } from './general/UploadsConfigModal'
export { default as APIsConfigModal } from './general/APIsConfigModal'
export { default as BackupConfigModal } from './general/BackupConfigModal'

// Re-export types from individual modals - no need to redefine them here
export type { Configuration, ConfigModalProps } from './general/EmailConfigModal'

// src/views/admin/settings/status-types/components/modals/index.ts

// Status Type Modals
export { default as CreateStatusTypeModal } from './status/CreateStatusTypeModal'
export { default as EditStatusTypeModal } from './status/EditStatusTypeModal'
export { default as DeleteStatusTypeModal } from './status/DeleteStatusTypeModal'

// Status Option Modals
export { default as CreateStatusOptionModal } from './status/CreateStatusOptionModal'
export { default as EditStatusOptionModal } from './status/EditStatusOptionModal'
export { default as DeleteStatusOptionModal } from './status/DeleteStatusOptionModal'

// Types
export type { StatusTypeFormData } from './status/CreateStatusTypeModal'
export type { StatusOptionFormData } from './status/CreateStatusOptionModal'

// Common interfaces for the modals
export interface StatusType {
  id: string
  code: string
  name: string
  description: string
  optionsCount?: number
  usageCount?: number
  createdAt: string
  updatedAt: string
}

export interface StatusOption {
  id: string
  statusTypeId: string
  code: string
  name: string
  level: number
  color: string
  icon: string
  isActive: boolean
  sortOrder: number
  usageCount?: number
  createdAt: string
  updatedAt: string
}