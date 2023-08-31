import { useEffect } from 'react'
import { useQueryClient, useMutation } from 'react-query'
import { updateUserSettings } from '../api/userSettingsApi'
import useError from './useError'
import useUser from './useUser'

export default function useTheme() {
  const { data } = useUser()
  const { handleError } = useError()
  const queryClient = useQueryClient()
  const updateUserSettingsMutation = useMutation(updateUserSettings, {
    onError: handleError,
  })

  const handleThemeChange = async () => {
    if (!data?.user?.userSettings) return

    await updateUserSettingsMutation.mutateAsync({
      ...data.user.userSettings,
      theme: data.user.userSettings.theme === 'dark' ? 'light' : 'dark',
    })

    await queryClient.invalidateQueries('user')
  }

  useEffect(() => {
    if (!data?.user?.userSettings) return

    const theme = data.user.userSettings.theme

    changeTheme(theme)
  }, [data?.user?.userSettings?.theme])

  const changeTheme = (theme: 'light' | 'dark') => {
    document.documentElement.dataset.bsTheme = theme
  }

  return { handleThemeChange, data, changeTheme }
}
