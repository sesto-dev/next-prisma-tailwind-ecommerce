import axios from 'axios'
import burnToast from '../burnToast'

export async function handleProductData(
    response,
    router,
    setPage,
    setPages,
    setProducts,
    setToast,
    noDataToast
) {
    const { data, error } = response

    if (error) {
        router.replace('/')
        burnToast(
            setToast,
            error && error.response && error.response.data
                ? error.response.data
                : 'Error'
        )
    }

    const { page, pages, products } = data

    if (!data || !products || !page || !pages) {
        router.replace('/')
        burnToast(setToast, noDataToast)
    }

    setPage(page)
    setPages(pages)
    setProducts(products)
}
