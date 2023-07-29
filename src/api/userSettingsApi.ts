import api from '.'
import { IUserSettings } from '../types'

const updateUserSettings = async (userSettings: IUserSettings) => {
  const response = await api.put('/user-settings', userSettings)

  return response.data
}

export { updateUserSettings }
