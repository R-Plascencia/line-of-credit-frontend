export class Payment {
    constructor(
        public id?: number,
        public amount?: string,
        public credit_line_id?: string,
        public new_bal?: string,
        public created_at?: string
    ){}
}