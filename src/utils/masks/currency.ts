const currencyFormatter = (value: string | number) => {
  if (value === '') return '';

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    style: 'currency',
    currency: 'USD',
  }).format(Number(value));
};

const floatParser = (value: string | number, digits = 2) => {
  const valorSemPontuacoes = String(value).replace(/\D/g, '');

  if (valorSemPontuacoes === '00') return '';

  const valorComPontuacao = Number(valorSemPontuacoes) / Math.pow(10, digits);

  return valorComPontuacao;
};

export const currency = {
  format: currencyFormatter,
  parse: floatParser,
};
