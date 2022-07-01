import { ToastMessage } from '@/presentation/common'

export type ToastContextModel = {
  show: (message: ToastMessage) => void
}
