export class LineOfCredit {
    constructor(
        public id?: number,
        public name?: string,
        public principal_bal?: number,
        public apr?: number,
        public interest?: number,
        public created_at?: string,
        public credit_limit?: number,
        public maxed?: boolean
    ){}
}