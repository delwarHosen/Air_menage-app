import { IMAGE_COMPONENTS } from '@/constants/image.index';

export type TaskStatus =
    | 'refused'
    | 'completed'
    | 'pending_accept'
    | 'scheduled';

export type Task = {
    id: string;
    status: TaskStatus;
    statusLabel: string;
    apartmentName: string;
    timeAgo: string;
    cleanerName: string;
    cleanerImage: any;
    apartmentImage: any;
    address: string;
    date: string;
    checkOut: string;
    checkIn: string;
    price: number;
    serviceFee: number;
};

export type RecommendedSchedule = {
    id: string;
    apartmentName: string;
    idealDate: string;
    timeSlot: string;
    cleanerName: string;
    cleanerImage: any;
    apartmentImage: any;
};

export const RECOMMENDED_SCHEDULE: RecommendedSchedule | null = {
    id: '1',
    apartmentName: 'Appartement T3 – City Center',
    idealDate: '10 September',
    timeSlot: '10:00pm – 12:30am',
    cleanerName: 'Sophie',
    cleanerImage: IMAGE_COMPONENTS.cleanerPP,
    apartmentImage: IMAGE_COMPONENTS.apartment,
};



// null করলে empty state দেখাবে
// export const RECOMMENDED_SCHEDULE: RecommendedSchedule | null = null;

export const TODO_TASKS: Task[] = [
    {
        id: '1',
        status: 'refused',
        statusLabel: 'Refused the mission.',
        apartmentName: 'Appartement T3 – City Center',
        timeAgo: '2 Hours ago',
        cleanerName: 'Sophie',
        cleanerImage: IMAGE_COMPONENTS.cleanerPP,
        apartmentImage: IMAGE_COMPONENTS.apartment,
        address: '12 Rue de Charenton 75012 Paris, France',
        date: 'Wednesday, may 22, 2026',
        checkOut: '10:00am',
        checkIn: '12:30pm',
        price: 55,
        serviceFee: 3,
    },
    {
        id: '2',
        status: 'refused',
        statusLabel: 'Refused the mission.',
        apartmentName: 'Appartement T9 – Paris 13',
        timeAgo: '2 Hours ago',
        cleanerName: 'Sophie',
        cleanerImage: IMAGE_COMPONENTS.cleanerPP,
        apartmentImage: IMAGE_COMPONENTS.apartment,
        address: '12 Rue de Charenton 75012 Paris, France',
        date: 'Wednesday, may 22, 2026',
        checkOut: '10:00am',
        checkIn: '12:30pm',
        price: 55,
        serviceFee: 3,
    },
    {
        id: '3',
        status: 'completed',
        statusLabel: 'Cleaning Completed',
        apartmentName: 'Appartement T9 – Paris 13',
        timeAgo: '2 Hours ago',
        cleanerName: 'Sophie',
        cleanerImage: IMAGE_COMPONENTS.cleanerPP,
        apartmentImage: IMAGE_COMPONENTS.apartment,
        address: '12 Rue de Charenton 75012 Paris, France',
        date: 'Wednesday, may 22, 2026',
        checkOut: '10:00am',
        checkIn: '12:30pm',
        price: 55,
        serviceFee: 3,
    },
    {
        id: '4',
        status: 'pending_accept',
        statusLabel: 'Accept your request',
        apartmentName: 'Appartement T9 – Paris 13',
        timeAgo: '2 Hours ago',
        cleanerName: 'Sophie',
        cleanerImage: IMAGE_COMPONENTS.cleanerPP,
        apartmentImage: IMAGE_COMPONENTS.apartment,
        address: '12 Rue de Charenton 75012 Paris, France',
        date: 'Wednesday, may 22, 2026',
        checkOut: '10:00am',
        checkIn: '12:30pm',
        price: 55,
        serviceFee: 3,
    },
];

// empty করলে empty state দেখাবে
// export const TODO_TASKS: Task[] = [];

export const CLEANING_DETAIL = {
    apartmentName: 'Apartment T3 – City Center',
    address: '12 Rue de Charenton\n75012 Paris, France',
    addressOneLine: '12 Rue de Charenton 75012 Paris, France',
    date: 'Wednesday, may 22, 2026',
    checkOut: '10:00am',
    checkIn: '12:30pm',
    housekeeper: 'Sophie',
    cleaningService: 55,
    serviceFee: 3,
    apartmentImage: IMAGE_COMPONENTS.apartment,
    cleaner: {
        name: 'Sophie',
        completedCleanings: 32,
        image: IMAGE_COMPONENTS.cleanerPP,
    },
};