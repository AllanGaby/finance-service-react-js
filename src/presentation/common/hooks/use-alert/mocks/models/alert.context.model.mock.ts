import { AlertContextModel, AlertMessage } from '@/presentation/common'

export const mockAlertContextModel = (): AlertContextModel => ({
  show: (message: AlertMessage) => { return undefined }
})
