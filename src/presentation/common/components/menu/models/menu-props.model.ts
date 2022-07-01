import { MenuItemProps } from '@/presentation/common'

export type MenuProps = {
  brandTitle?: string
  onHandleBrand?: () => JSX.Element
  onHandleCustomHeader?: () => JSX.Element
  onHandleMenuFooter?: () => JSX.Element
  items: MenuItemProps[]
}
