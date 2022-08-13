import { Tabs, useTheme } from '@geist-ui/core'
import { useRouter } from 'next/router'

import { isLocaleRTL } from '../../helpers/RTL'

export default function ({ config, i18n, sticky }) {
    const router = useRouter()
    const { locale = config.defaultLocale } = router
    const theme = useTheme()

    const submenu = i18n['components']['header']['submenu']

    return (
        <>
            {config && i18n && submenu && (
                <nav className="SubmenuWrapper">
                    <div className={`Submenu ${sticky ? 'SubmenuSticky' : ''}`}>
                        <div className="SubmenuInner">
                            <Tabs
                                value={router.pathname}
                                onChange={(route) => router.push(route)}
                            >
                                {isLocaleRTL(locale) ? (
                                    <>
                                        {submenu['tabs']
                                            .slice(0)
                                            .reverse()
                                            .map((tab) => (
                                                <Tabs.Item
                                                    key={tab['label'][locale]}
                                                    label={tab['label'][locale]}
                                                    value={tab.value}
                                                />
                                            ))}
                                        <Tabs.Item
                                            ml={0}
                                            label={submenu['home'][locale]}
                                            value="/"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Tabs.Item
                                            ml={0}
                                            label={submenu['home'][locale]}
                                            value="/"
                                        />
                                        {submenu['tabs'].map((tab) => (
                                            <Tabs.Item
                                                key={tab['label'][locale]}
                                                label={tab['label'][locale]}
                                                value={tab.value}
                                            />
                                        ))}
                                    </>
                                )}
                            </Tabs>
                        </div>
                    </div>
                </nav>
            )}
            <style jsx global>
                {`
                    .scroll-container {
                        padding-left: 0px !important;
                        border: none !important;
                    }
                    .SubmenuWrapper {
                        height: 50px;
                        position: relative;
                        overflow: hidden;
                        box-shadow: inset 0 -1px ${theme.palette.border};
                    }
                    .SubmenuSticky {
                        transition: box-shadow 1s ease;
                    }
                    .SubmenuSticky {
                        position: fixed;
                        z-index: 1100;
                        top: 0;
                        right: 0;
                        left: 0;
                        background: ${theme.palette.background};
                        box-shadow: ${theme.type === 'dark'
                            ? `inset 0 -1px ${theme.palette.border}`
                            : 'rgba(0, 0, 0, 0.1) 0 0 15px 0'};
                    }
                    .SubmenuInner {
                        display: flex;
                        width: ${config.theme.width};
                        max-width: 100%;
                        margin: 0 auto;
                        padding: 0 ${theme.layout.pageMargin};
                        height: 50px;
                        overflow-y: hidden;
                        overflow-x: auto;
                        overflow: -moz-scrollbars-none;
                        -ms-overflow-style: none;
                        -webkit-overflow-scrolling: touch;
                        scrollbar-width: none;
                        box-sizing: border-box;
                        justify-content: ${isLocaleRTL(locale)
                            ? 'end'
                            : 'space-between'};
                    }
                    .SubmenuInner::-webkit-scrollbar {
                        display: none;
                    }
                    .SubmenuInner .content {
                        display: none;
                    }
                    .SubmenuInner .tabs,
                    .SubmenuInner header {
                        height: 100%;
                        border: none !important;
                    }
                    .SubmenuInner .tab {
                        height: calc(100% - 2px);
                        padding-top: 0;
                        padding-bottom: 0;
                        color: ${theme.palette.accents_5};
                        font-size: 0.825rem;
                    }
                    .SubmenuInner .tab:hover {
                        color: ${theme.palette.foreground};
                    }
                    .SubmenuInner .active {
                        color: ${theme.palette.foreground};
                        border: none !important;
                    }
                `}
            </style>
        </>
    )
}
