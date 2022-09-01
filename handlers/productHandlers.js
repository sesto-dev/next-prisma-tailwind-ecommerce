import axios from 'axios'
import burnToast from '../helpers/burnToast'

export async function handleProductsData({
    response,
    router,
    setPages,
    setProducts,
    setToast,
    noDataToast,
}) {
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

    setPages(pages)
    setProducts(products)
}

export async function handleProductData({
    response,
    router,
    setTitle,
    setImage,
    setProduct,
    setToast,
    noDataToast,
    setListingID,
}) {
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

    if (!data) {
        router.replace('/')
        burnToast(setToast, noDataToast)
    }

    const { name, images, listings } = data

    setTitle(name)
    setImage(images[0])
    setProduct(data)
    setListingID(listings[0]['_id'])
}
