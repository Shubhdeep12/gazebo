import { useParams } from 'react-router-dom'

import { useUsers, useUpdateUser } from 'services/users'
import { ApiFilterEnum } from 'services/navigation'
import { getOwnerImg } from 'shared/utils'
import { providerToName } from 'shared/utils/provider'
import Button from 'ui/Button'

function useAdminsAndRevoke({ provider, owner }) {
  const params = { isAdmin: ApiFilterEnum.true }
  const { data, refetch } = useUsers({
    provider,
    owner,
    query: params,
  })
  const { mutate, isLoading } = useUpdateUser({ provider, owner, params })

  function revokeUser(username) {
    mutate(
      {
        targetUser: username,
        is_admin: false,
      },
      {
        onSuccess: refetch,
      }
    )
  }

  return {
    admins: data?.results ?? [],
    revokeUser,
    isLoading,
  }
}

function AdminList() {
  const { provider, owner } = useParams()
  const { admins, revokeUser, isLoading } = useAdminsAndRevoke({
    provider,
    owner,
  })

  if (admins.length === 0) {
    return (
      <p className="text-gray-800">
        No admins yet. Note that admins in your {providerToName(provider)}{' '}
        organization are automatically considered admins.
      </p>
    )
  }

  return (
    <div>
      {admins.map((admin) => {
        // temporary until User support a slim variant
        const avatarUrl = getOwnerImg(provider, admin.username)
        return (
          <div className="flex" key={admin.username}>
            <img
              className="rounded-full h-8 w-8 mr-4"
              src={avatarUrl}
              alt={admin.username}
            />
            <p>{admin.name}</p>
            <p>@{admin.username}</p>
            <span className="flex-initial flex text-sm space-x-2 bg-gray-200 text-gray-900 rounded-full px-3">
              {admin.email}
            </span>
            <Button
              disabled={isLoading}
              className="ml-auto"
              variant="outline"
              color="gray"
              onClick={() => revokeUser(admin.username)}
            >
              Revoke
            </Button>
          </div>
        )
      })}
    </div>
  )
}

export default AdminList