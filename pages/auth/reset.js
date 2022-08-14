import useState from 'react-usestateref'
import { useRouter } from 'next/router'
import { Button, Grid, useTheme, useToasts, Input, Text } from '@geist-ui/core'

import isEmail from '../../helpers/isEmail'
import Layout from '../../components/Layout'
import { themePreference } from '../../state/Theme'
import { isLocaleRTL, getLocaleDirection } from '../../helpers/RTL'
import {
    forgotHandler,
    resetHandler,
} from '../../helpers/handlers/authHandlers'

import config from '../../config/main.config'
import i18n from '../../config/i18n.config'

export default function () {
    const theme = useTheme()
    const router = useRouter()
    const { locale = config.defaultLocale } = router
    const { setToast } = useToasts()

    const folio = i18n['auth']['reset']
    const title = folio['title'][locale]
    const description = folio['description'][locale]

    const [loading, setLoading] = useState(false)
    const [nextStage, setNextStage] = useState(false)
    const [email, setEmail, refEmail] = useState('')
    const [code, setCode, refCode] = useState('')
    const [password, setPassword, refPassword] = useState('')

    return (
        <>
            {i18n && (
                <>
                    <Layout
                        config={config}
                        i18n={i18n}
                        themePreference={themePreference}
                        crownLarge={title}
                        crownSmall={description}
                        metaTitle={title}
                    >
                        <Grid.Container gap={0.5} className="avanti">
                            <Grid xs={24}>
                                <Input
                                    label={
                                        !isLocaleRTL(locale) &&
                                        i18n['inputs']['email']['label'][locale]
                                    }
                                    labelRight={
                                        isLocaleRTL(locale) &&
                                        i18n['inputs']['email']['label'][locale]
                                    }
                                    placeholder={
                                        i18n['inputs']['email']['placeholder'][
                                            locale
                                        ]
                                    }
                                    width="400pt"
                                    value={email}
                                    type={
                                        refEmail.current == ''
                                            ? 'default'
                                            : isEmail(refEmail.current)
                                            ? 'success'
                                            : 'error'
                                    }
                                    onChange={(e) => {
                                        setEmail(e.target.value.trim())
                                    }}
                                />
                            </Grid>
                            <Grid xs={24}>
                                {!nextStage &&
                                    refEmail.current != '' &&
                                    !isEmail(refEmail.current) && (
                                        <Text small type="error">
                                            {
                                                i18n['inputs']['email'][
                                                    'error'
                                                ][locale]
                                            }
                                        </Text>
                                    )}
                            </Grid>
                            <Grid xs={24}>
                                {!nextStage && (
                                    <Button
                                        loading={loading}
                                        disabled={
                                            !refEmail.current ||
                                            !isEmail(refEmail.current)
                                        }
                                        type="secondary"
                                        onClick={(e) =>
                                            forgotHandler(
                                                config,
                                                refEmail,
                                                setLoading,
                                                setToast,
                                                setNextStage,
                                                i18n['toasts']['forgot'][locale]
                                            )
                                        }
                                    >
                                        <b>
                                            {i18n['buttons']['submit'][locale]}
                                        </b>
                                    </Button>
                                )}
                            </Grid>
                            <Grid xs={24}>
                                {nextStage && (
                                    <Input
                                        label={
                                            !isLocaleRTL(locale) &&
                                            i18n['inputs']['code']['label'][
                                                locale
                                            ]
                                        }
                                        labelRight={
                                            isLocaleRTL(locale) &&
                                            i18n['inputs']['code']['label'][
                                                locale
                                            ]
                                        }
                                        placeholder={
                                            i18n['inputs']['code'][
                                                'placeholder'
                                            ][locale]
                                        }
                                        width="100%"
                                        type="secondary"
                                        value={code}
                                        onChange={(e) => {
                                            setCode(e.target.value.trim())
                                        }}
                                    />
                                )}
                            </Grid>
                            <Grid xs={24}>
                                {nextStage && (
                                    <Input
                                        label={
                                            !isLocaleRTL(locale) &&
                                            i18n['inputs']['password']['label'][
                                                locale
                                            ]
                                        }
                                        labelRight={
                                            isLocaleRTL(locale) &&
                                            i18n['inputs']['password']['label'][
                                                locale
                                            ]
                                        }
                                        placeholder={
                                            i18n['inputs']['password'][
                                                'placeholder'
                                            ][locale]
                                        }
                                        width="100%"
                                        type={
                                            refPassword.current == ''
                                                ? 'default'
                                                : refPassword.current.length > 7
                                                ? 'success'
                                                : 'error'
                                        }
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value.trim())
                                        }}
                                    />
                                )}
                            </Grid>
                            <Grid xs={24}>
                                {nextStage &&
                                    !refPassword.current == '' &&
                                    refPassword.current.length < 8 && (
                                        <Text small type="error">
                                            {
                                                i18n['inputs']['password'][
                                                    'error'
                                                ][locale]
                                            }
                                        </Text>
                                    )}
                            </Grid>
                            <Grid xs={24}>
                                {nextStage && (
                                    <Button
                                        loading={loading}
                                        disabled={
                                            !refCode.current ||
                                            !refPassword.current ||
                                            refPassword.current.length < 8
                                        }
                                        type="secondary"
                                        onClick={(e) =>
                                            resetHandler(
                                                config,
                                                refCode,
                                                refPassword,
                                                setLoading,
                                                setToast,
                                                router,
                                                i18n['toasts']['reset'][locale]
                                            )
                                        }
                                    >
                                        <b>
                                            {i18n['buttons']['submit'][locale]}
                                        </b>
                                    </Button>
                                )}
                            </Grid>
                        </Grid.Container>
                    </Layout>
                    <style jsx global>
                        {`
                            input::placeholder {
                                text-align: ${isLocaleRTL(locale)
                                    ? 'right'
                                    : 'left'};
                                direction: ${getLocaleDirection(
                                    locale
                                )} !important;
                            }
                            .avanti > .item {
                                justify-content: ${isLocaleRTL(locale)
                                    ? 'end'
                                    : 'start'};
                            }
                        `}
                    </style>
                </>
            )}
        </>
    )
}
