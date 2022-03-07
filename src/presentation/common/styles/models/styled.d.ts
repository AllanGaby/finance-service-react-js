import 'styled-components'
import { CustomThemeModel } from '@/presentation/common/styles'

declare module 'styled-components' {
  export interface DefaultTheme extends CustomThemeModel {}
}
