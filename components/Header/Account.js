import Link from 'next/link'
import { useToasts, Button, Popover, Text, useTheme } from '@geist-ui/core'
import { AvatarIcon, LogoutIcon } from '../SVGs'
import { useRouter } from 'next/router'
import { useAuth } from '../../state/Auth'
import { logoutHandler } from '../../helpers/handlers'

export default function ({ config, sticky }) {
    const theme = useTheme()
    const router = useRouter()
    const { setAuthenticated } = useAuth()
    const { setToast } = useToasts()

    const popoverContent = () => {
        return (
            <>
                {config.popover &&
                    config.popover.map((link) => (
                        <Popover.Item pt={1} pb={0.2} key={link.label}>
                            <Link href={link.value}>
                                <Button
                                    type="secondary"
                                    scale={0.8}
                                    width="100%"
                                >
                                    {link.label}
                                </Button>
                            </Link>
                        </Popover.Item>
                    ))}
                <Popover.Item>
                    <Button
                        scale="0.8"
                        onClick={(e) =>
                            logoutHandler(
                                config,
                                setToast,
                                setAuthenticated,
                                router
                            )
                        }
                        icon={<LogoutIcon />}
                    >
                        Logout
                    </Button>
                </Popover.Item>
                <style jsx global>
                    {`
                        a {
                            color: ${theme.palette.accents_6};
                        }
                        a:hover {
                            color: ${theme.palette.background}!important;
                        }
                    `}
                </style>
            </>
        )
    }

    if (config.authentication) {
        return (
            <Popover py={0.5} width="100%" content={popoverContent}>
                <Button
                    ml={0.3}
                    px={1.4}
                    scale={0.6}
                    auto
                    type="secondary"
                    icon={<AvatarIcon />}
                >
                    <Text b>ACCOUNT</Text>
                </Button>
            </Popover>
        )
    }
}
