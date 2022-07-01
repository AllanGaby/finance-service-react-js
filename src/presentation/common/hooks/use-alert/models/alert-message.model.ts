import { AlertDialogProps } from '@/presentation/common'

export type AlertMessage = Omit<AlertDialogProps, 'onClose'>
