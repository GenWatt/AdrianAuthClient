import React from 'react'
import Text from '../UI/Text'
import useUser from '../hooks/useUser'

export default function Me() {
  const { data, isLoading } = useUser()
  return (
    <div>
      <Text isLoading={isLoading}>
        <strong className="text-primary">{data?.user?.username}</strong>
        &nbsp; settings account
      </Text>
    </div>
  )
}
