import Link from 'next/link'
import { getGoogleURL } from 'lib/google'
import { GoogleBAWIcon } from 'components/Icons'
import Modal from 'components/modals/Modal'

export default function LoginModal({ modalVisibility, setModalVisibility }) {
    return (
        <Modal
            title="Login / Register"
            modalVisibility={modalVisibility}
            setModalVisibility={setModalVisibility}
        >
            <div className="px-6 pt-0 pb-6">
                <a
                    href={getGoogleURL()}
                    className="group mb-1 flex items-center rounded-md bg-purple-600 py-3 px-6 text-gray-100 transition  duration-300 hover:bg-black"
                >
                    <GoogleBAWIcon />
                    <span className="ml-3 mt-0 whitespace-nowrap font-medium">
                        Login with Google
                    </span>
                </a>
                <small className="text-xs font-normal text-gray-500 dark:text-gray-400">
                    By logging in, you agree to our{' '}
                    <Link
                        className="font-semibold text-purple-600 hover:text-purple-300"
                        href="/terms"
                    >
                        terms of service
                    </Link>
                    .
                </small>
            </div>
        </Modal>
    )
}
