import { getAvatarUrl } from "../services/image-url";
import useAccount from "../hooks/useAccount";
import { Image } from "@chakra-ui/react"


interface Props {
    sessionID: string | null
}

const UserAvatar = ({sessionID}: Props) => {
    
    const {data: account, isLoading, error} = useAccount(sessionID || '');

  return (
    account && <Image
        src={getAvatarUrl(account?.avatar.tmdb.avatar_path)}
        boxSize="150px"
        borderRadius="full"
        fit="cover"
        alt={account.username}
    />
  )
}

export default UserAvatar
