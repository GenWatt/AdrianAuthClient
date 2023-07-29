import { MoonFill, BrightnessHighFill } from 'react-bootstrap-icons'
import { useMutation, useQueryClient } from 'react-query'
import { Tooltip } from 'react-tooltip'
import { updateUserSettings } from '../api/userSettingsApi'
import useError from '../hooks/useError'
import useUser from '../hooks/useUser'
import { useEffect } from 'react'

export default function ThemePicker() {
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

    document.documentElement.dataset.bsTheme = theme
  }, [data?.user?.userSettings?.theme])

  return (
    <>
      {data && (
        <div>
          <div
            id="darkModeTooltip"
            className="text-light pointer pe-1"
            onClick={handleThemeChange}
          >
            {data.user.userSettings.theme === 'dark' ? (
              <MoonFill size={24} />
            ) : (
              <BrightnessHighFill size={24} />
            )}
          </div>
          <Tooltip anchorSelect="#darkModeTooltip" place="bottom">
            {data.user.userSettings.theme === 'dark'
              ? 'Turn on light mode'
              : 'Turn on dark mode'}
          </Tooltip>
        </div>
      )}
    </>
  )
}
