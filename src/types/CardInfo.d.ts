export type CardInfo = {
    gen: number;
    redion: string;
    name: string;
    fields: field[];
};

export type field = {    
            id: number;
            description: string;
            imageName: string;
            path: string;
            type: string;
        }