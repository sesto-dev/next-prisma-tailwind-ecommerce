import Link from 'next/link'
import { ButtonDropdown, useToasts, useTheme } from '@geist-ui/core'
import { useRouter } from 'next/router'

import { useAuth } from '../../state/Auth'
import { logoutHandler } from '../../helpers/handlers/authHandlers'

export default function ({ config, i18n }) {
    const theme = useTheme()
    const router = useRouter()
    const { locale = config.defaultLocale } = router
    const { setAuthenticated } = useAuth()
    const { setToast } = useToasts()

    const account = i18n['components']['header']['account']

    return (
        <>
            {account && (
                <ButtonDropdown scale={0.63} auto>
                    <ButtonDropdown.Item main>
                        <b>{account['text'][locale]}</b>
                    </ButtonDropdown.Item>
                    {account['links'].map((link) => (
                        <ButtonDropdown.Item key={link['label'][locale]}>
                            <Link href={link.value}>
                                <b>{link['label'][locale]}</b>
                            </Link>
                        </ButtonDropdown.Item>
                    ))}
                    <ButtonDropdown.Item
                        type="secondary"
                        onClick={(e) =>
                            logoutHandler(
                                config,
                                setToast,
                                setAuthenticated,
                                router,
                                i18n['toasts']['logout'][locale]
                            )
                        }
                    >
                        <b>{account['logout'][locale]}</b>
                    </ButtonDropdown.Item>
                </ButtonDropdown>
            )}
        </>
    )
}
