import { BarChartLegendProps } from '@/presentation/common/components'
import { mockBarChartLegendItemProps } from '@/presentation/common/components/bar-chart/components/bar-chart-legend/mocks'

export const mockBarChartLegendProps = (): BarChartLegendProps => ({
  barLegends: [mockBarChartLegendItemProps()]
})
