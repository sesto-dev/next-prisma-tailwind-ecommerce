import Link from 'next/link'
import {
    Grid,
    Button,
    ButtonDropdown,
    useToasts,
    useTheme,
} from '@geist-ui/core'
import { useRouter } from 'next/router'

import { useAuth } from '../../state/Auth'
import { logoutHandler } from '../../helpers/handlers/authHandlers'

export default function ({ config, i18n }) {
    const theme = useTheme()
    const router = useRouter()
    const { locale = config.defaultLocale } = router
    const { setToast } = useToasts()
    const { setLocalAuthentication } = useAuth()

    const account = i18n['components']['header']['account']

    return (
        <>
            {account && (
                <Grid.Container>
                    <Grid xs={0} sm={24}>
                        <ButtonDropdown
                            className="MainDropdown"
                            scale={0.63}
                            auto
                        >
                            <ButtonDropdown.Item main>
                                <b>{account['text'][locale]}</b>
                            </ButtonDropdown.Item>
                            {account['links'].map((link) => (
                                <ButtonDropdown.Item
                                    key={link['label'][locale]}
                                >
                                    <Link href={link.value}>
                                        <b>{link['label'][locale]}</b>
                                    </Link>
                                </ButtonDropdown.Item>
                            ))}
                            <ButtonDropdown.Item
                                type="secondary"
                                onClick={(e) =>
                                    logoutHandler({
                                        config,
                                        setToast,
                                        setLocalAuthentication,
                                        router,
                                        toast: i18n['toasts']['logout'][locale],
                                    })
                                }
                            >
                                <b>{account['logout'][locale]}</b>
                            </ButtonDropdown.Item>
                        </ButtonDropdown>
                    </Grid>
                    <Grid xs={24} sm={0}>
                        <div style={{ display: 'block' }}>
                            {account['links'].map((link) => (
                                <Link
                                    key={link['label'][locale]}
                                    href={link.value}
                                >
                                    <a>
                                        <Button mb={1} width="100%">
                                            {link['label'][locale]}
                                        </Button>
                                    </a>
                                </Link>
                            ))}
                            <Button
                                width="100%"
                                mb={1}
                                onClick={(e) =>
                                    logoutHandler({
                                        config,
                                        setToast,
                                        setLocalAuthentication,
                                        router,
                                        toast: i18n['toasts']['logout'][locale],
                                    })
                                }
                            >
                                <b>{account['logout'][locale]}</b>
                            </Button>
                        </div>
                    </Grid>
                </Grid.Container>
            )}
        </>
    )
}
