import axios from 'axios'
import useState from 'react-usestateref'
import { useRouter } from 'next/router'
import {
    Button,
    Grid,
    useTheme,
    useToasts,
    Input,
    Description,
} from '@geist-ui/core'
import Layout from '../../components/Layout'

import { themePreference } from '../../state/Theme'
import config from '../../main.config'
import { useEffect } from 'react'

export default function () {
    const title = 'Verify Email'
    const description =
        'Verify your email address using the verification email sent to your email address.'

    const theme = useTheme()
    const router = useRouter()
    const { setToast } = useToasts()

    const [loading, setLoading] = useState(false)
    const [code, setCode, refCode] = useState('')

    const fetch = async (e) => {
        const { data, error } = await axios.get(config.backend.routes.account)

        if (error) {
            setToast({
                text: (
                    <Description
                        title={new Date().toUTCString()}
                        content={{ error }}
                    />
                ),
                delay: 5000,
            })
        }

        if (!data || error) {
            router.replace('/')
            setToast({
                text: (
                    <Description
                        title={new Date().toUTCString()}
                        content={
                            'You are not logged in or your account data could not be fetched.'
                        }
                    />
                ),
                delay: 5000,
            })
            return
        }

        if (data.isVerified) {
            router.replace('/dashboard')
            setToast({
                text: (
                    <Description
                        title={new Date().toUTCString()}
                        content={'You have already verified your email.'}
                    />
                ),
                delay: 5000,
            })
            return
        }
    }

    useEffect(() => {
        fetch()
    }, [])

    const submitHandler = async (e) => {
        setLoading(true)

        let response

        try {
            response = await axios.post(
                config.backend.routes.verify,
                {
                    code: refCode.current,
                },
                config.backend.axios.simple
            )
        } catch (error) {
            setLoading(false)
            setToast({
                text: (
                    <Description
                        title={new Date().toUTCString()}
                        content={error.message}
                    />
                ),
                delay: 5000,
            })
        }

        if (response && response.status && response.status == 200) {
            setToast({
                text: (
                    <Description
                        title={new Date().toUTCString()}
                        content={'✓ Email Verification Successful'}
                    />
                ),
                delay: 5000,
            })

            router.replace('/dashboard')
        }
    }

    return (
        <Layout
            config={config}
            themePreference={themePreference}
            crownLarge={title}
            crownSmall={description}
            metaTitle={title}
        >
            <Grid.Container gap={1}>
                <Grid xs={24}>
                    <Input
                        mr={0.5}
                        label="Code"
                        placeholder="Input your verification code"
                        value={code}
                        onChange={(e) => {
                            setCode(e.target.value)
                        }}
                    />
                    <Button
                        loading={loading}
                        scale={0.7}
                        type="secondary"
                        onClick={submitHandler}
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid.Container>
        </Layout>
    )
}
