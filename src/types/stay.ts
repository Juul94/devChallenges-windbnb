export interface Stay {
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

export type Stays = Stay[];

export interface Guests {
    adults: number;
    children: number;
}

export interface GetListRequestQuery {
    location: string;
    guests: Guests;
}
