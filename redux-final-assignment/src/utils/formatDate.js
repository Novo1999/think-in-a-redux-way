import moment from 'moment'

export const formatDate = (str) => {
  const date = moment(str)
  const dateComponent = date.utc().format('YYYY-MM-DD')
  const timeComponent = date.utc().format('HH:mm:ss')
  return `${dateComponent} ${timeComponent}`
}
