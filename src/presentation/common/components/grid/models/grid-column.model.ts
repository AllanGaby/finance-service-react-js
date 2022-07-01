import { GridColumnContentProps, GridColumnHeaderProps } from '@/presentation/common'

export type GridColumn = Omit<Omit<GridColumnContentProps, 'entity'>, 'rowId'> & GridColumnHeaderProps
