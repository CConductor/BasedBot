export const PREFIX_LIST = ["", "K", "M", "B", "T", "Qd", "Qn"]

const addCommas = (number: number): string => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

const prefix = (number: number): string => {
  if (number === 0) return "0"

  const exponent = Math.floor(Math.log10(Math.abs(number)))
  const prefixIndex = Math.min(Math.floor(exponent / 3), PREFIX_LIST.length - 1)

  const shortNumber = number / Math.pow(10, prefixIndex * 3)
  const roundedNumber = parseFloat(shortNumber.toFixed(2))

  return `${roundedNumber}${PREFIX_LIST[prefixIndex]}`
}

export default (number: number, long: boolean = false): string => long ? addCommas(number) : prefix(number)
