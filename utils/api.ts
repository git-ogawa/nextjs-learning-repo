import { APIPagination } from "@/app/types/api"

export function Pagination(
  items: unknown[],
  pageSize: number,
  currentPage: number,
): { pagination: APIPagination; currentPageItem: T[] } {
  const totalItems = items.length
  const totalPages = Math.ceil(totalItems / pageSize)
  const hasNextPage = currentPage < totalPages
  const hasPreviousPage = currentPage > 1
  const nextPage = hasNextPage ? currentPage + 1 : null
  const previousPage = hasPreviousPage ? currentPage - 1 : null

  const splitItems = paginateArray(items, pageSize)
  let currentPageItem = splitItems[currentPage - 1]
  if (!currentPageItem) {
    currentPageItem = []
  }

  const pagination: APIPagination = {
    currentPage: currentPage,
    pageSize: pageSize,
    totalItems: totalItems,
    totalPages: totalPages,
    hasNextPage: hasNextPage,
    hasPreviousPage: hasPreviousPage,
    nextPage: nextPage,
    previousPage: previousPage,
  }
  return {
    pagination: pagination,
    currentPageItem: currentPageItem,
  }
}

function paginateArray<T>(array: T[], perPage: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < array.length; i += perPage) {
    result.push(array.slice(i, i + perPage))
  }
  return result
}
