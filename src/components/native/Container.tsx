import Footer from 'components/native/Footer'
import Header from 'components/native/Header'

export default function Container({ children }) {
    return (
        <main
            id="skip"
            className="flex flex-col justify-center px-[1.4rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem] 2xl:px-[12rem]"
        >
            <Header />
            {children}
            <Footer />
        </main>
    )
}
