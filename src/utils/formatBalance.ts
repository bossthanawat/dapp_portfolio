import BigNumber from 'bignumber.js'
import { BIG_TEN } from './bigNumber'

/**
 * Take a formatted amount, e.g. 15 BNB and convert it to full decimal value, e.g. 15000000000000000
 */
export const getDecimalAmount = (amount: BigNumber, decimals = 18) => {
  return new BigNumber(amount).times(BIG_TEN.pow(decimals))
}

export const getBalanceAmount = (amount: BigNumber, decimals = 18) => {
  return new BigNumber(amount).dividedBy(BIG_TEN.pow(decimals))
}

export const getFullDisplayBalance = (balance: BigNumber, decimals = 18, decimalsToAppear?: number) => {
  return balance.dividedBy(BIG_TEN.pow(decimals)).toFixed(decimalsToAppear)
}

export const formatNumber = (number: number, minPrecision = 3, maxPrecision = 3) => {
  const options = {
    minimumFractionDigits: minPrecision,
    maximumFractionDigits: maxPrecision,
  }
  return number.toLocaleString(undefined, options)
}
