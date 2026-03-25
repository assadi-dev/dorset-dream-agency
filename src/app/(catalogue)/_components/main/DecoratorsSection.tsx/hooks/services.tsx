import { DecoratorCollectionApiType } from "../type";

export const fetchDecorators = async (params: { limit: number; order: string, search?: string }): Promise<DecoratorCollectionApiType> => {
    const url = new URL('/api/decorator-profiles/collections', window.location.origin)
    Object.entries(params).forEach(([key, value]) => {
        if (value) {
            url.searchParams.set(key, value.toString())
        }
    })

    const response = await fetch(url.toString())
    const data = await response.json()

    return data
}