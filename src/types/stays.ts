export interface Stay {
    uid: string;
    city: string;
    country: string;
    superHost: boolean;
    title: string;
    rating: number;
    maxGuests: number;
    type: 'Entire apartment' | 'Entire house' | 'Private room';
    beds: number | null;
    photo: string;
}

export interface Guests {
    adults: number;
    children: number;
}

export interface GetListRequestQuery {
    location: string;
    guests: Guests;
}
