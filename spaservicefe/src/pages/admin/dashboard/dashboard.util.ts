import { apiUrl } from '../../../types/constants'

export async function fetchTransactionsOrderByMonth(): Promise<{ date: string, revenue: number }[] | { msg: string }> {
  try {
    const response = await fetch(`${apiUrl}/transactions/OrderByMonth`)

    if (!response.ok) {
      // If the response is not OK, return the error message
      const errorData: { msg: string } = await response.json()
      return errorData
    }

    const data: { date: string, revenue: number }[] = await response.json()

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
  return map
}

export interface CategoryRevenue {
  category: string
  revenue: number
}

export async function fetchTransactionsByServiceCategory(): Promise<CategoryRevenue[] | { msg: string }> {
  try {
    const response = await fetch(`${apiUrl}/transactions/OrderByServiceCategory`)

    if (response.ok) {
      const data: CategoryRevenue[] = await response.json()
      return data
    } else if (response.status === 500) {
      const errorData: { msg: string } = await response.json()
      return errorData
    } else {
      throw new Error(`Unexpected response status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching transactions:', error)
    return { msg: 'An error occurred while fetching transactions.' }
  }
}

export async function fetchTransactionsByCosmeticCategory(): Promise<CategoryRevenue[] | { msg: string }> {
  try {
    const response = await fetch(`${apiUrl}/cosmeticcategories/OrderByCategory`)

    if (response.ok) {
      const data: CategoryRevenue[] = await response.json()
      return data
    } else if (response.status === 500) {
      const errorData: { msg: string } = await response.json()
      return errorData
    } else {
      throw new Error(`Unexpected response status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching transactions:', error)
    return { msg: 'An error occurred while fetching transactions.' }
  }
}

export async function fetchNumOfCustomers() {
  try {
    const response = await fetch(`${apiUrl}/customers/NumOfCustomers`)

    if (response.ok) {
      // Parse and return the object {total: number, newCustomer: number}
      return (await response.json()) as { total: number; newCustomers: number }
    } else if (response.status === 500) {
      // Parse and return the error object {msg: string}
      return (await response.json()) as { msg: string }
    } else {
      throw new Error(`Unexpected response status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching number of customers:', error)
    return { msg: 'An error occurred while fetching the number of customers.' }
  }
}

export async function fetchTransactionsOrderByDay(): Promise<
  { date: string; service: number; product: number }[] | { msg: string }
> {
  try {
    const response = await fetch(`${apiUrl}/transactions/OrderByDay`)

    if (response.ok) {
      // Parse and return the array of {date: string, service: number, product: number}
      return await response.json()
    } else if (response.status === 500) {
      // Parse and return the error object {msg: string}
      return await response.json()
    } else {
      throw new Error(`Unexpected response status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching transactions by day:', error)
    return { msg: 'An error occurred while fetching transactions by day.' }
  }
}

export async function fetchFeedbackOrderByRating(): Promise<{ rating: number; count: number }[] | { msg: string }> {
  try {
    const response = await fetch(`${apiUrl}/feedbacks/OrderByRating`)

    if (response.ok) {
      // Parse and return the array of {date: string, service: number, product: number}
      return await response.json()
    } else if (response.status === 500) {
      // Parse and return the error object {msg: string}
      return await response.json()
    } else {
      throw new Error(`Unexpected response status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching transactions by day:', error)
    return { msg: 'An error occurred while fetching transactions by day.' }
  }
}

export type GenderData = {
  date: string,
  male: number,
  female: number
}

export async function fetchAppointmentByGender(): Promise<GenderData[] | { msg: string }> {
  try {
    const response = await fetch(`${apiUrl}/appointments/OrderByGender`)

    if (response.ok) {
      // Parse and return the array of {date: string, service: number, product: number}
      return await response.json()
    } else if (response.status === 500) {
      // Parse and return the error object {msg: string}
      return await response.json()
    } else {
      throw new Error(`Unexpected response status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching transactions by day:', error)
    return { msg: 'An error occurred while fetching transactions by day.' }
  }
}