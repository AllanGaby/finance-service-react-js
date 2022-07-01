import { ButtonProps } from '@/presentation/common'

export type AlertDialogProps = {
  title?: string
  onClose?: () => void
  message: string
  confirmButton?: ButtonProps
  cancelButton?: ButtonProps
}
