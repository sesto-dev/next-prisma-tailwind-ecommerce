import Link from 'next/link'
import { useState } from 'react'
import { Button, Popover, Text, useTheme } from '@geist-ui/core'

export default function Menu({ config, sticky }) {
    const theme = useTheme()

    const content = () => (
        <>
            {config.popover &&
                config.popover.map((link) => (
                    <Popover.Item key={link.name}>
                        <Link href={link.link}>{link.name}</Link>
                    </Popover.Item>
                ))}
            <Popover.Item line />
            <Popover.Item>
                <Button scale="0.8">Logout</Button>
            </Popover.Item>
            <style jsx global>
                {`
                    a {
                        color: ${theme.palette.accents_6};
                    }
                    a:hover {
                        color: ${theme.palette.foreground};
                    }
                `}
            </style>
        </>
    )

    return (
        <Popover py={0.5} width="100%" content={content}>
            <Button
                style={
                    sticky
                        ? {
                              top: '1.5px',
                          }
                        : {}
                }
                aria-label="Toggle Dark mode"
                ml={0.3}
                px={1.4}
                scale={0.6}
            >
                <Text b>{session['user']['email'].toUpperCase()}</Text>
            </Button>
        </Popover>
    )
}
