import { MoonFill, BrightnessHighFill } from 'react-bootstrap-icons'
import { Tooltip } from 'react-tooltip'
import useTheme from '../hooks/useTheme'

export default function ThemePicker() {
  const { data, handleThemeChange } = useTheme()

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
