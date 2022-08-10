import Link from 'next/link'
import {
    ButtonDropdown,
    useToasts,
    Button,
    Popover,
    Text,
    useTheme,
} from '@geist-ui/core'
import { AvatarIcon, LogoutIcon } from '../SVGs'
import { useRouter } from 'next/router'
import { useAuth } from '../../state/Auth'
import { logoutHandler } from '../../helpers/handlers'

export default function ({ config, sticky }) {
    const theme = useTheme()
    const router = useRouter()
    const { setAuthenticated } = useAuth()
    const { setToast } = useToasts()

    return (
        <ButtonDropdown scale={0.63} auto>
            <ButtonDropdown.Item main>
                <b>ACCOUNT</b>
            </ButtonDropdown.Item>
            {config.popover &&
                config.popover.map((link) => (
                    <ButtonDropdown.Item key={link.label}>
                        <Link href={link.value}>
                            <b>{link.label}</b>
                        </Link>
                    </ButtonDropdown.Item>
                ))}
            <ButtonDropdown.Item
                type="secondary"
                onClick={(e) =>
                    logoutHandler(config, setToast, setAuthenticated, router)
                }
            >
                <b>Logout</b>
            </ButtonDropdown.Item>
        </ButtonDropdown>
    )
}
