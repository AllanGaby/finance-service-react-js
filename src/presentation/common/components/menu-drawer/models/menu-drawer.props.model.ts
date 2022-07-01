import { MenuItemProps, MenuDrawerPlacement } from '@/presentation/common'

export type MenuDrawerProps = {
  isOpen: boolean
  onClose: () => void
  title?: string
  route?: string
  onHandleTitle?: () => JSX.Element
  onClick?: () => Promise<void>
  items?: MenuItemProps[]
  placement?: MenuDrawerPlacement
  onHandleFooter?: () => JSX.Element
}
