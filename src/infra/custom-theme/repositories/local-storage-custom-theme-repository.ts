import { SaveLocalStorageRepository, RecoverLocalStorageRepository } from '@/data/common/repositories'
import { SaveCustomThemeRepository, RecoverCustomThemeRepository } from '@/data/custom-theme/repositories'
import { ThemeModel } from '@/domain/custom-theme'

export class LocalStorageCustomThemeRepository implements SaveCustomThemeRepository, RecoverCustomThemeRepository {
  constructor (
    private readonly themeKey: string,
    private readonly saveLocalStorageRepository: SaveLocalStorageRepository,
    private readonly recoverLocalStorageRepository: RecoverLocalStorageRepository
  ) {}

  async save (theme: ThemeModel): Promise<ThemeModel> {
    await this.saveLocalStorageRepository.save<ThemeModel>({
      key: this.themeKey,
      record: theme
    })
    return theme
  }

  async get (): Promise<ThemeModel> {
    return await this.recoverLocalStorageRepository.recover<ThemeModel>(this.themeKey) as ThemeModel
  }
}
