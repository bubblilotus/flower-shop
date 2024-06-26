export class Product {

    constructor(public id?: string,
                public name?: string,
                public description?: string,
                public composition?: string,
                public meaning?: string,
                public unitPrice?: number,
                public imageUrl?: string,
                public active?: boolean,
                public unitsInStock?: number,
                public dateCreated?: Date,
                public lastUpdated?: Date
        ) {}
    
}
