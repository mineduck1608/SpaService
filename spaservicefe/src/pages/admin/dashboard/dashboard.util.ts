import { apiUrl } from '../../../types/constants'

export async function fetchTransactionsOrderByMonth(): Promise<number[] | { msg: string }> {
  try {
    const response = await fetch(`${apiUrl}/transactions/OrderByMonth`)

    if (!response.ok) {
      // If the response is not OK, return the error message
      const errorData: { msg: string } = await response.json()
      return errorData
    }

    const data: number[] = await response.json()

    // Check if the response is a number array of length 12
    if (Array.isArray(data)) {
      return data
    } else {
      // If the response is not as expected, return an error message
      return { msg: 'Invalid response format: expected an array of length 12' }
    }
  } catch (error) {
    // Handle network errors or other exceptions
    return { msg: 'An error occurred while fetching data' }
  }
}

export function lineChartXAxis(arr: number[]) {
  var month = new Date().getMonth() + 1
  var divider = 13 - month
  var year = (new Date().getFullYear() - 1) % 2000
  var map = arr.map((v, i) => {
    var monthDate = (month + i) % 13
    if (monthDate < month) {
      monthDate += 1
    }
    return {
      month: `${monthDate}/${i < divider ? year : year + 1}`,
      revenue: v
    }
  })
  console.log(map);
  
  return map;
}
