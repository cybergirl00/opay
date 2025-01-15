import airtel from '@/assets/images/airtel.png'
import glo from '@/assets/images/glo.png'
import mtn from '@/assets/images/mtn.png'
import mobile from '@/assets/images/9mobile.png'
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
        icon: 'mobile-phone',
        to: '/airtime'
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



export const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    
    // Extract the components of the date
    const month = date.toLocaleString('default', { month: 'short' }); // 'Jan', 'Feb', etc.
    const day = date.getDate();
    const year = date.getFullYear();
    
    // Add suffix for the day (e.g., 'st', 'nd', 'rd', 'th')
    const daySuffix = (day: any) => {
      if (day > 3 && day < 21) return 'th'; // Special case for 11th to 13th
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
    
    return `${month} ${day}${daySuffix(day)}, ${year}`;
  };


  export const providers = [
    {
        id: 1,
        name: 'Airtel',
        icon: airtel
    },
    {
        id: 2,
        name: '9Mobile',
        icon: mobile
    },
    {
        id: 3,
        name: 'Glo',
        icon: glo
    },
    {
        id: 4,
        name: 'MTN',
        icon: mtn
    },
  ]

  export const airtimePlans = [
    {
        id: 1,
        price: 50
    },
    {
        id: 2,
        price: 100
    },
    {
        id: 3,
        price: 200
    },
    {
        id: 4,
        price: 500
    },
    {
        id: 5,
        price: 1000
    },
    {
        id: 6,
        price: 2000
    },
  ]