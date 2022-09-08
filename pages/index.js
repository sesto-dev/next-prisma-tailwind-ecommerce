import { useEffect } from 'react'
import { getLocaleDirection, isLocaleRTL } from 'aryana'
import {
    Grid,
    Card,
    Description,
    Text,
    Snippet,
    useTheme,
} from '@geist-ui/core'
import essentials from '../helpers/getEssentials'

export default function ({ auth }) {
    const {
        config,
        i18n,
        useThemeProvider,
        useAuth,
        useRouter,
        Link,
        Head,
        axios,
        useMeta,
    } = essentials

    const { setMeta } = useMeta()
    const theme = useTheme()
    const { locale = config['defaultLocale'] } = useRouter()
    const { isAuthenticated, setLocalAuthentication } = useAuth()

    useEffect(() => {
        setLocalAuthentication(auth)
    }, [])

    const { title, description, content } = i18n['pages']['index']

    useEffect(() => {
        setMeta({
            title: title[locale],
            description: description[locale],
            image: 'https://i.imgur.com/NitQE9d.jpg',
            large: title[locale],
            small: description[locale],
        })
    }, [locale])

    return (
        <Grid.Container gap={1}>
            <Grid xs={24}>
                <Card
                    width="100%"
                    style={{
                        backgroundColor: theme.palette.accents_1,
                    }}
                >
                    <Text
                        type="secondary"
                        style={{
                            direction: getLocaleDirection(locale),
                        }}
                    >
                        {isLocaleRTL(locale)
                            ? 'این صفحه برای نمایش سادگی استفاده از کامپوننت ها ساخته شده است. برای دسترسی به صفحات شخصی میتوانید ثبت نام کنید و یا از  ایمیل و پسوورد زیر استفاده کنید:'
                            : 'This page is designed to showcase the simplicity of the Layout component. In order to access protected routes you can register or use these credentials:'}
                    </Text>
                    <Description
                        width="100%"
                        title="Email"
                        mb={1}
                        content={
                            <Snippet
                                symbol=""
                                font="1rem"
                                toastText={i18n['toasts']['copied'][locale]}
                                toastType="default"
                                text="test@test.com"
                            />
                        }
                    />
                    <Description
                        width="100%"
                        title="Password"
                        content={
                            <Snippet
                                symbol=""
                                font="1rem"
                                toastText={i18n['toasts']['copied'][locale]}
                                toastType="default"
                                text="12345678"
                            />
                        }
                    />
                </Card>
            </Grid>
        </Grid.Container>
    )
}

export async function getServerSideProps(ctx) {
    const { AJWT } = ctx.req.cookies

    return {
        props: { auth: AJWT ? true : false },
    }
}
