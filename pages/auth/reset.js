import { Button, Grid, useToasts, Input, Text } from '@geist-ui/core'

import { isLocaleRTL, fetchHandler, isEmail } from 'aryana'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Head from 'next/head'
import { useAuth } from '../../state/Auth'

import config from '../../config/main.config'
import i18n from '../../config/i18n.config'

export default function () {
    const router = useRouter()
    const { locale = config['defaultLocale'] } = useRouter()
    const { setToast } = useToasts()

    const { title, description } = i18n['pages']['reset']

    const [loading, setLoading] = useState(false)
    const [nextStage, setNextStage] = useState(false)
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [password, setPassword] = useState('')

    async function onForgot() {
        let response
        setLoading(true)

        try {
            response = await axios.post(
                config.routes.backend.forgot,
                {
                    email: email,
                },
                config.axios.simple
            )
        } catch (error) {
            response = error.response
        }

        fetchHandler({
            router,
            response,
            setLoading,
            setToast,
            setState: setNextStage,
            success_toast: i18n['toasts']['forgot'][locale],
        })
    }

    async function onReset() {
        let response
        setLoading(true)

        try {
            response = await axios.post(
                config.routes.backend.reset,
                {
                    code,
                    password,
                },
                config.axios.simple
            )
        } catch (error) {
            response = error.response
        }

        fetchHandler({
            router,
            response,
            setLoading,
            setToast,
            success_toast: i18n['toasts']['forgot'][locale],
            success_redirect_uri: config.routes.frontend.login,
        })
    }

    return (
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
                    placeholder={i18n['inputs']['email']['placeholder'][locale]}
                    width="400pt"
                    value={email}
                    type={
                        email == ''
                            ? 'default'
                            : isEmail(email)
                            ? 'success'
                            : 'error'
                    }
                    onChange={(e) => {
                        setEmail(e.target.value.trim().toLowerCase())
                    }}
                />
            </Grid>
            <Grid xs={24}>
                {!nextStage && email != '' && !isEmail(email) && (
                    <Text small type="error">
                        {i18n['inputs']['email']['error'][locale]}
                    </Text>
                )}
            </Grid>
            <Grid xs={24}>
                {!nextStage && (
                    <Button
                        loading={loading}
                        disabled={!email || !isEmail(email)}
                        type="secondary"
                        onClick={onForgot}
                    >
                        <b>{i18n['buttons']['submit'][locale]}</b>
                    </Button>
                )}
            </Grid>
            <Grid xs={24}>
                {nextStage && (
                    <Input
                        label={
                            !isLocaleRTL(locale) &&
                            i18n['inputs']['verificationCode']['label'][locale]
                        }
                        labelRight={
                            isLocaleRTL(locale) &&
                            i18n['inputs']['verificationCode']['label'][locale]
                        }
                        placeholder={
                            i18n['inputs']['verificationCode']['placeholder'][
                                locale
                            ]
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
                            i18n['inputs']['password']['label'][locale]
                        }
                        labelRight={
                            isLocaleRTL(locale) &&
                            i18n['inputs']['password']['label'][locale]
                        }
                        placeholder={
                            i18n['inputs']['password']['placeholder'][locale]
                        }
                        width="100%"
                        type={
                            password == ''
                                ? 'default'
                                : password.length > 7
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
                {nextStage && !password == '' && password.length < 8 && (
                    <Text small type="error">
                        {i18n['inputs']['password']['error'][locale]}
                    </Text>
                )}
            </Grid>
            <Grid xs={24}>
                {nextStage && (
                    <Button
                        loading={loading}
                        disabled={!code || !password || password.length < 8}
                        type="secondary"
                        onClick={onReset}
                    >
                        <b>{i18n['buttons']['submit'][locale]}</b>
                    </Button>
                )}
            </Grid>
        </Grid.Container>
    )
}
