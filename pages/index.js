import React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import { Grid, Card, Text, Code } from '@geist-ui/core'

import { themePreference } from '../state/Context'
import config from '../main.config'

const Index = () => {
    return (
        <Layout config={config} themePreference={themePreference}>
            <Grid.Container gap={1}>
                <Grid xs={24}>
                    <Card>
                        <Text type="secondary">
                            This page is designed to showcase the simplicity of
                            the <Code>{'<Layout />'}</Code> component. Please
                            visit the <Link href="/about">About</Link> page
                            which displays a more substantial usecase.
                        </Text>
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    )
}

export default Index
