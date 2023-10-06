const MODALITIES = {
  '► 100% ONLINE': 'online',
  '► 100% ONLINE INTENSIVA': 'online',
  'Online': 'online',
  'A DISTANCIA': 'online',
  'A Distancia': 'online',
  'A distancia': 'online',
  'Virtual': 'online',
  'online sincrónico': 'online',
  'online sincrónico y asincrónico': 'online',
  'Blended': 'blended',
  '» Blended': 'blended',
  'PRESENCIAL': 'offline',
  'Presencial': 'offline',
  'Autogestionado': 'recorded',
  'Comienza hoy': 'recorded',
  'no-data': 'no-data'
}
const MODALITIES_ALIAS = {
  'online': 'online',
  'blended': 'blended',
  'offline': 'presencial',
  'no-data': 'no-data'
}
const MONTHS = {
  0: 'enero',
  1: 'febrero',
  2: 'marzo',
  3: 'abril',
  4: 'mayo',
  5: 'junio',
  6: 'julio',
  7: 'agosto',
  8: 'septiembre',
  9: 'octubre',
  10: 'noviembre',
  11: 'diciembre'
}
const MONTHS_ALIAS = Object.fromEntries(Object.values(MONTHS).map((d, i) => [d, i]))
const DAYS = {
  0: 'Domingo',
  1: 'Lunes',
  2: 'Martes',
  3: 'Miércoles',
  4: 'Jueves',
  5: 'Viernes',
  6: 'Sábado ',
}
const DAYS_ALIAS = Object.fromEntries(Object.values(DAYS).map((d, i) => [d, i]))

module.exports = {
  MODALITIES,
  MODALITIES_ALIAS,
  MONTHS,
  MONTHS_ALIAS,
  DAYS,
  DAYS_ALIAS
}
