import Footer from 'components/Footer'
import Header from 'components/Header'

export default function Container({ children }) {
    return (
        <div>
            <main
                id="skip"
                className="flex flex-col justify-center px-[2rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem] 2xl:px-[20rem]"
            >
                <Header />
                {children}
                <Footer />
            </main>
        </div>
    )
}
