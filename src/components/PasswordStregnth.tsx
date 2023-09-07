import { IPasswordRules } from '../types'
import Text from '../UI/Text'
import { useEffect, useState } from 'react'

export interface IPasswordStregnthProps {
  password: string
  rules: IPasswordRules
}

interface ISegment {
  color: string
  width: number
  text: string
  textColor?: string
}

const getNotUndefinedRulesLength = (rules: IPasswordRules) => {
  let length = 0

  if (rules.minLength) {
    length++
  }

  if (rules.minLowercase) {
    length++
  }

  if (rules.minUppercase) {
    length++
  }

  if (rules.minNumbers) {
    length++
  }

  if (rules.minSymbols) {
    length++
  }

  return length
}

export default function PasswordStregnth({
  password,
  rules,
}: IPasswordStregnthProps) {
  const [progressBarSegments, setProgressBarSegments] = useState<ISegment[]>([])
  const segmentsColors = ['danger', 'warning', 'info', 'success']
  const segmentsText = ['Too weak', 'Weak', 'Good', 'Strong']
  const segmentsTextColors = ['light', 'dark', 'light', 'light']
  const maxScore = getNotUndefinedRulesLength(rules)

  const checkMinLength = (minLength: number): boolean => {
    if (password.length < minLength) {
      return false
    }

    return true
  }

  const checkPassword = () => {
    let score = 0

    if (rules.minLength) {
      if (checkMinLength(rules.minLength)) {
        score++
      }
    }

    if (password.match(/[a-z]/)) {
      score++
    } else {
    }

    if (password.match(/[A-Z]/)) {
      score++
    }

    if (password.match(/[0-9]/)) {
      score++
    }

    if (password.match(/[^a-zA-Z0-9]/)) {
      score++
    }

    calculateSegments(score)
  }

  const calculateSegments = (score: number) => {
    const segments: ISegment[] = []

    for (let i = 0; i < maxScore; i++) {
      if (i < score) {
        segments.push({
          color: segmentsColors[i],
          width: 100 / maxScore,
          text: segmentsText[i],
            textColor: segmentsTextColors[i],
        })
      } else {
        segments.push({
          color: 'light',
          width: 100 / maxScore,
          text: segmentsText[i],
            textColor: 'dark',
        })
      }

      setProgressBarSegments(segments)
    }
  }

  useEffect(() => {
    checkPassword()
  }, [password])

  return (
    <div className="progress mt-3" style={{ height: '2rem' }}>
      {progressBarSegments.map((segment, index) => (
        <div
          key={index}
          className={`progress-bar bg-${segment.color}`}
          role="progressbar"
          style={{ width: `${segment.width}%` }}
          aria-valuenow={segment.width}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <Text className={`text-${segment.textColor}`}>{segment.text}</Text>
        </div>
      ))}
    </div>
  )
}
