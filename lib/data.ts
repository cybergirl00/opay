import airtel from '@/assets/images/airtel.png'
import glo from '@/assets/images/glo.png'
import mtn from '@/assets/images/mtn.png'
import mobile from '@/assets/images/9mobile.png'


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
        icon: 'mobile-phone',
        to: '/data'
    },
    {
        id: 1,
        title: 'To Opay',
        icon: 'envelope-o',
        to: '/bank-transfer'
    },
    {
        id: 2,
        title: 'To Bank',
        icon: 'bank',
        to: '/bank-transfer'
    },
]

export const prefixToProvider = {
    '070': glo,   // Glo
    '080': glo,   // Glo
    '081': mtn,   // MTN
    '082': mtn,   // MTN
    '083': mtn,   // MTN
    '084': mtn,   // MTN
    '085': mtn,   // MTN
    '086': mtn,   // MTN
    '087': mtn,   // MTN
    '088': mtn,   // MTN
    '090': airtel,   // Airtel
    '091': mobile,   // 9Mobile
    '092': mobile,   // 9Mobile
    '093': mobile,   // 9Mobile
    '094': mobile,   // 9Mobile
    '095': mobile,   // 9Mobile
    '096': mobile,   // 9Mobile
};



  export const providers = [
    {
        id: 1,
        name: 'airtel',
        icon: airtel
    },
    {
        id: 2,
        name: '9Mobile',
        icon: mobile
    },
    {
        id: 3,
        name: 'glo',
        icon: glo
    },
    {
        id: 4,
        name: 'mtn',
        icon: mtn
    },
  ]

  export const airtimePlans = [
    {
        id: 1,
        price: 100
    },
    {
        id: 2,
        price: 150
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
  export  const dataPlans = [
    { code: "500", network: "mtn", data: "500MB", duration: "30 Days", price: 200, discountPrice: 189 },
    { code: "M1024", network: "mtn", data: "1GB", duration: "30 Days", price: 350, discountPrice: 299 },
    { code: "M2024", network: "mtn", data: "2GB", duration: "30 Days", price: 680, discountPrice: 599 },
    { code: "3000", network: "mtn", data: "3GB", duration: "30 Days", price: 1030, discountPrice: 899 },
    { code: "5000", network: "mtn", data: "5GB", duration: "30 Days", price: 1700, discountPrice: 1499 },
    { code: "mtn-20hrs-1500", network: "mtn", data: "6GB", duration: "7 Days", price: 1500, discountPrice: 1489 },
    { code: "10000", network: "mtn", data: "10GB", duration: "30 Days", price: 3400, discountPrice: 2999 },
    { code: "mtn-30gb-8000", network: "mtn", data: "30GB", duration: "30 Days", price: 8000, discountPrice: 7899 },
    { code: "mtn-40gb-10000", network: "mtn", data: "40GB", duration: "30 Days", price: 10000, discountPrice: 9859 },
    { code: "mtn-75gb-15000", network: "mtn", data: "75GB", duration: "30 Days", price: 14000, discountPrice: 14899 },
  
    { code: "AIRTEL500MB", network: "airtel", data: "500MB", duration: "30 Days", price: 200, discountPrice: 189 },
    { code: "AIRTEL1GB", network: "airtel", data: "1GB", duration: "30 Days", price: 350, discountPrice: 299 },
    { code: "AIRTEL2GB", network: "airtel", data: "2GB", duration: "30 Days", price: 680, discountPrice: 599 },
    { code: "AIRTEL5GB", network: "airtel", data: "5GB", duration: "30 Days", price: 1700, discountPrice: 1499 },
    { code: "AIRTEL10GB", network: "airtel", data: "10GB", duration: "30 Days", price: 3400, discountPrice: 2999 },
    { code: "AIRTEL15GB", network: "airtel", data: "15GB", duration: "30 Days", price: 5000, discountPrice: 4489 },
    { code: "AIRTEL20GB", network: "airtel", data: "20GB", duration: "30 Days", price: 6000, discountPrice: 5989 },
    { code: "airt-330x", network: "airtel", data: "1GB", duration: "1 Day", price: 350, discountPrice: 325 },
    { code: "airt-550", network: "airtel", data: "750MB", duration: "14 Days", price: 550, discountPrice: 539 },
    { code: "airt-1100", network: "airtel", data: "1.5GB", duration: "30 Days", price: 1100, discountPrice: 1069 },
    { code: "airt-1300", network: "airtel", data: "2GB", duration: "30 Days", price: 1300, discountPrice: 1279 },
    { code: "airt-1650", network: "airtel", data: "3GB", duration: "30 Days", price: 1700, discountPrice: 1629 },
    { code: "airt-2200", network: "airtel", data: "4.5GB", duration: "30 Days", price: 2200, discountPrice: 2179 },
    { code: "airt-1650-2", network: "airtel", data: "6GB", duration: "7 Days", price: 1700, discountPrice: 1629 },
    { code: "airt-3300", network: "airtel", data: "10GB", duration: "30 Days", price: 3300, discountPrice: 3279 },
    { code: "airt-5500", network: "airtel", data: "20GB", duration: "30 Days", price: 5489, discountPrice: 5479 },
    { code: "airt-11000", network: "airtel", data: "40GB", duration: "30 Days", price: 10800, discountPrice: 10699 },
  
    { code: "glo100x", network: "glo", data: "1GB", duration: "5 Nights", price: 100, discountPrice: 98 },
    { code: "glo200x", network: "glo", data: "1.25GB", duration: "1 Day (Sunday)", price: 200, discountPrice: 198 },
    { code: "G500", network: "glo", data: "1.35GB", duration: "14 Days", price: 500, discountPrice: 485 },
    { code: "G1000", network: "glo", data: "2.9GB", duration: "30 Days", price: 1000, discountPrice: 969 },
    { code: "G2000", network: "glo", data: "5.8GB", duration: "30 Days", price: 2000, discountPrice: 1939 },
    { code: "G2500", network: "glo", data: "7.7GB", duration: "30 Days", price: 2500, discountPrice: 2439 },
    { code: "G3000", network: "glo", data: "10GB", duration: "30 Days", price: 3000, discountPrice: 2939 },
    { code: "G4000", network: "glo", data: "13.25GB", duration: "30 Days", price: 4000, discountPrice: 3879 },
    { code: "G5000", network: "glo", data: "18.25GB", duration: "30 Days", price: 4900, discountPrice: 4839 },
    { code: "G8000", network: "glo", data: "29.5GB", duration: "30 Days", price: 7800, discountPrice: 7779 },
    { code: "glo10000", network: "glo", data: "50GB", duration: "30 Days", price: 10000, discountPrice: 9859 },
  
    { code: "9MOB1000", network: "9Mobile", data: "1GB", duration: "30 Days", price: 1000, discountPrice: 979 },
    { code: "9MOB34500", network: "9Mobile", data: "2.5GB", duration: "30 Days", price: 2000, discountPrice: 1979 },
    { code: "9MOB8000", network: "9Mobile", data: "11.5GB", duration: "30 Days", price: 8000, discountPrice: 7899 },
    { code: "9MOB5000", network: "9Mobile", data: "15GB", duration: "30 Days", price: 10000, discountPrice: 9859 },
  ];

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

  
  export const formattedCurrency = (amount: number): string => {
    return `₦${new Intl.NumberFormat('en-NG', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount)}`;
};
