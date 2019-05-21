import moment from 'dayjs'

export default function (date, format = 'YYYY-MM-DD hh:mm:ss') {
  return moment(new Date(date)).format(format)
}
