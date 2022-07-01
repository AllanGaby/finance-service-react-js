import { InputProps, SelectValue } from '@/presentation/common'

export type SelectProps = Omit<Omit<InputProps, 'type'>, 'defaultValue'> & {
  defaultValue?: string
  options: SelectValue[]
  onChangeValue?: (value: SelectValue) => void
}
