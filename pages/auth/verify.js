import axios from 'axios'
import useState from 'react-usestateref'
import { useRouter } from 'next/router'
import { Button, Grid, useTheme, useToasts, Input } from '@geist-ui/core'
import Layout from '../../components/Layout'

import { themePreference } from '../../state/Theme'
import config from '../../main.config'
import { verifyHandler } from '../../helpers/handlers'

export default function () {
    const title = 'WELCOME'
    const description =
        'Verify your email address using the verification email sent to your email address.'

    const theme = useTheme()
    const router = useRouter()
    const { setToast } = useToasts()

    const [loading, setLoading] = useState(false)
    const [code, setCode, refCode] = useState('')

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
                        onClick={(e) =>
                            verifyHandler(
                                config,
                                setLoading,
                                setToast,
                                router,
                                refCode
                            )
                        }
                    >
                        <b>SUBMIT</b>
                    </Button>
                </Grid>
            </Grid.Container>
        </Layout>
    )
}
