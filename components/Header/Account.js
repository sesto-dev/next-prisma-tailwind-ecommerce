import Link from 'next/link'
import { useContext } from 'react'
import {
    useToasts,
    Description,
    Button,
    Popover,
    Text,
    useTheme,
} from '@geist-ui/core'
import { UserContext } from '../../state/Context'
import { AvatarIcon, LogoutIcon } from '../SVGs'
import { useRouter } from 'next/router'

export default function Account({ config, sticky }) {
    const theme = useTheme()
    const router = useRouter()

    const { user, setUser } = useContext(UserContext)

    const { setToast } = useToasts()

    const logoutHandler = async (e) => {
        setToast({
            text: (
                <Description
                    title={new Date().toUTCString()}
                    content={'✓ Logout Successful'}
                />
            ),
            delay: 5000,
        })
        setUser(null)
        localStorage.setItem('user', null)
        router.replace('/')
    }

    const popoverContent = () => {
        return (
            <>
                {config.popover &&
                    config.popover.map((link) => (
                        <Popover.Item py={0.2} key={link.label}>
                            <Link href={link.value}>
                                <Button scale={0.8} width="100%">
                                    {link.label}
                                </Button>
                            </Link>
                        </Popover.Item>
                    ))}
                <Popover.Item>
                    <Button
                        scale="0.8"
                        type="secondary"
                        onClick={logoutHandler}
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

    return (
        <Popover py={0.5} width="100%" content={popoverContent}>
            <Button
                style={
                    sticky
                        ? {
                              top: '1.5px',
                          }
                        : {}
                }
                ml={0.3}
                px={1.4}
                scale={0.6}
                auto
                icon={<AvatarIcon />}
            >
                <Text b>ACCOUNT</Text>
            </Button>
        </Popover>
    )
}
