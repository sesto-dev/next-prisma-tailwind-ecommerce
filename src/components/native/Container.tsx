import Footer from 'components/native/Footer'
import Header from 'components/native/Header'

export default function Container({ children }) {
    return (
        <main id="skip" className="flex flex-col justify-center">
            <Header />
            <div className="px-[1.4rem] md:px-[4rem]">{children}</div>
            <Footer />
        </main>
    )
}
