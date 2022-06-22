const defaultProps = {
    crownLarge: 'Large Text',
    crownSmall: 'Small text as a description for the page.',
    themePreference: null,
    config: {
        theme: {
            width: '900pt',
        },
        meta: {
            title: 'GEIST-ABSTRACTION',
            image: 'https://i.imgur.com/NitQE9d.jpg',
            url: 'https://example.com',
            handle: '@example',
            keywords: 'geist-ui, nextjs, reactjs',
        },
        links: {
            email: 'mailto:example@example.com',
            twitter: 'https://twitter.com/example',
            linkedin: 'https://linkedin.com/in/example',
            github: 'https://github.com/example',
        },
        tabs: [
            {
                label: 'CONTACT',
                value: '/contact',
            },
        ],
    },
}

export default defaultProps
