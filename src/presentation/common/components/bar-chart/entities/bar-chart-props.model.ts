import { BarChartLegendItemProps } from '@/presentation/common/components'

export type BarChartProps = {
  data: any[]
  xAxisKey: string
  legends: BarChartLegendItemProps[]
  total: string
  width?: number
  height: number
  visible?: boolean
  isCurrencyValue?: boolean
  onChangeParams: (period: string, valueType: string) => void
}
