export type TaskStatusScreenData = {
    refused: {
        cleanerName: string;
        cleanerImage: any;
        cleanerLocation: string;
        apartmentName: string;
        apartmentImage: any;
        location: string;
        idealSlot: string;
        timeSlot: string;
        nearestHousekeepers: {
            id: string;
            name: string;
            location: string;
            image: any;
        }[];
        noHousekeeperAvailable: boolean;
    };
    completed: {
        apartmentName: string;
        apartmentImage: any;
        date: string;
        time: string;
        cleanerName: string;
        cleanerImage: any;
        photos: any[];
        notes: string;
    };
    report_problem: {
        cleanerName: string;
        cleanerImage: any;
        cleanerLocation: string;
        reportedAt: string;
        message: string;
        photos: any[];
        ligament: string;
        apartmentName: string;
        dateAndHouse: string;
    };
    pending_accept: {
        cleanerName: string;
        cleanerImage: any;
        apartmentName: string;
        apartmentImage: any;
        apartmentLocation: string;
        apartmentCountry: string;
    };
};

export type Cleaner = {
    id: string;
    name: string;
    image: any;
};

export type HousingItem = {
    id: string;
    name: string;
    location: string;
    image: any;
    cleaners: Cleaner[];
};