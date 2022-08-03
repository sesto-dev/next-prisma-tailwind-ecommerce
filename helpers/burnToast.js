import { Description } from '@geist-ui/core'

export default async function (setToast, content) {
    setToast({
        text: (
            <Description title={new Date().toUTCString()} content={content} />
        ),
        delay: 5000,
    })
}
