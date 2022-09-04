import config from '../config/main.config'
import i18n from '../config/i18n.config'
import { useThemeProvider } from '../state/Theme'
import { useAuth } from '../state/Auth'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default {
    config,
    i18n,
    useThemeProvider,
    useAuth,
    Link,
    Head,
    useRouter,
}
