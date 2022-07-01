import { AlertMessage } from '@/presentation/common'

export type AlertContextModel = {
  show: (message: AlertMessage) => void
}
