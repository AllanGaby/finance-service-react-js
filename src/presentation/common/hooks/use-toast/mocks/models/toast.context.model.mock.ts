import { ToastContextModel, ToastMessage } from '@/presentation/common'

export const mockToastContextModel = (): ToastContextModel => ({
  show: (message: ToastMessage) => { return undefined }
})
