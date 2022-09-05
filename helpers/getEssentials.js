import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from 'axios'

import { useThemeProvider } from '../state/Theme'
import { useAuth } from '../state/Auth'
import { useMeta } from '../state/Meta'

import config from '../config/main.config'
import i18n from '../config/i18n.config'

const essentials = {
    config,
    i18n,
    Link,
    Head,
    axios,
    useThemeProvider,
    useAuth,
    useRouter,
    useMeta,
}

export default essentials
