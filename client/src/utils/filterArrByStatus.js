export const filterArrByStatus = (arr, status) => {
    return Array.isArray(arr) ? arr.filter( e => e.status === status) : []
}