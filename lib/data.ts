export const transfers = [
    {
        id: 1,
        title: 'To Opay',
        icon: 'envelope-o'
    },
    {
        id: 2,
        title: 'To Bank',
        icon: 'bank'
    },
    {
        id: 3,
        title: 'Withdraw',
        icon: 'google-wallet'
    },
]


export const vtu = [
    {
        id: 1,
        title: 'Airtime',
        icon: 'mobile-phone'
    },
    {
        id: 2,
        title: 'Data',
        icon: 'mobile-phone'
    },
    {
        id: 3,
        title: 'Betting',
        icon: 'soccer-ball-o'
    },
    {
        id: 4,
        title: 'Tv',
        icon: 'tv'
    },
    {
        id: 5,
        title: 'Safebox',
        icon: 'inbox'
    },
    {
        id: 6,
        title: 'Loan',
        icon: 'handshake-o'
    },
]


export const formattedCurrency = (amount: number): string => {
    return `₦${new Intl.NumberFormat('en-NG', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount)}`;
};

