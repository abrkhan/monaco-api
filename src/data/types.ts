export type Discrimination = {
    flag: boolean;
    race?:boolean;
    sex?: boolean;
    gender?: boolean;
    age?: boolean;
    bullying?: boolean;
}


export type Case =  {
    salary: number;
    settlementAgreement: boolean;
    isEmployed: boolean;
    lastEmployedOver3Months: boolean;
    numberOfYearsEmployed: number;
    discrimination: Discrimination;
    description: string;
    status: 'accepted' | 'rejected'
}
