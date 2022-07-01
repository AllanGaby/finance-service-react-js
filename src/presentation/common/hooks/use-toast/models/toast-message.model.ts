import { ToastType, ToastPosition } from '@/presentation/common'

export type ToastMessage = {
  title?: string
  message: string
  type?: ToastType
  position?: ToastPosition
}
