import Link from 'next/link'
import { Grid, Card, Text, Code, useTheme } from '@geist-ui/core'
import { useRouter } from 'next/router'

import Layout from '../components/Layout'
import { themePreference } from '../state/Theme'
import config from '../main.config'

export default function () {
    const theme = useTheme()
    const { locale = 'en' } = useRouter()

    const title = i18n['title'][locale]
    const description = i18n['description'][locale]

    const Content = () => {
        if (locale == 'ja') {
            return (
                <Text type="secondary">
                    このページは、レイアウト
                    コンポーネントのシンプルさを紹介するために設計されています。
                    より充実したユースケースを表示するページについてをご覧ください。
                </Text>
            )
        } else {
            return (
                <Text type="secondary">
                    This page is designed to showcase the simplicity of the{' '}
                    <Code>{'<Layout />'}</Code> component. Please visit the{' '}
                    <Link href="/about">About</Link> page which displays a more
                    substantial usecase.
                </Text>
            )
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
                    <Card
                        style={{
                            backgroundColor: `${theme.palette.accents_1}`,
                        }}
                    >
                        <Content />
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    )
}

const i18n = {
    title: {
        en: 'Index',
        ja: '表題',
    },
    description: {
        en: 'Index Sample Page',
        ja: 'インデックス サンプル ページ',
    },
}
