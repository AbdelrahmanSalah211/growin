

export function formatPrice(price: number, currency: string, locale: string): string {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(price);
}