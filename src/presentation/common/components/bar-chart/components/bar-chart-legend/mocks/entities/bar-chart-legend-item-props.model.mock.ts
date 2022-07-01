import { BarChartLegendItemProps } from '@/presentation/common/components'
import { commerce, datatype } from 'faker'

export const mockBarChartLegendItemProps = (): BarChartLegendItemProps => ({
  color: commerce.color(),
  text: datatype.string(),
  key: datatype.uuid()
})
