import moment from 'moment';

export function toDate(val) {
  if (!val) return '';
  return moment(val).format('YYYY/MMM/DD');
}

export function toDateWithoutDay(val) {
  if (!val) return '';
  return moment(val).format('MM/YY');
}

export function toCurrency(val, currency) {
  if (val && currency) {
    return `${val} ${currency}`;
  }
  return 0;
}

export function fixed(val) {
  if (!val) return '0';
  return `${Number(val).toFixed(2)}`;
}

export function toImage(val) {
  if (!val) return '../assets/no-product-image.png';
  return val;
}
