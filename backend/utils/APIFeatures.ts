import { SelectQueryBuilder } from 'typeorm';

interface QueryParams {
    page?:string;
    sort?:string;
    limit?:string;
    fields?:string;
    [key:string]: any;
}

export class APIFeatures<Entity> {
    private query: SelectQueryBuilder<Entity>;
    private queryParams: QueryParams;

    constructor(query: SelectQueryBuilder<Entity>, queryParams: QueryParams) {
        this.query = query;
        this.queryParams = queryParams;
    }
    
    //filtering function
    filter(): this {
        const excludedFields = ['page', 'sort', 'limit'];
        const filters = {...this.queryParams};
        excludedFields.forEach(field => delete filters[field]);

        Object.keys(filters).forEach(key => {
            const value = filters[key];

            const [relation, field] = key.includes('.') ? key.split('.') : [null, null];
            const column = relation ? `${relation}.${field}` : `${this.query.alias}.${key}`;

            if(typeof value === 'object') {
                Object.entries(value).forEach(([operator, opValue]) => {
                    const paramkey = key.replace('.', '_')+'_'+operator;
                    switch (operator) {
                        case 'gte':
                            this.query.andWhere(`${column} >= :${paramkey}`, { [paramkey]: opValue });
                            break;
                        case 'gt':
                            this.query.andWhere(`${column} > :${paramkey}`, { [paramkey]: opValue });
                            break;
                        case 'lte':
                            this.query.andWhere(`${column} <= :${paramkey}`, { [paramkey]: opValue });
                            break;
                        case 'lt':
                            this.query.andWhere(`${column} < :${paramkey}`, { [paramkey]: opValue });
                            break;
                    }
                });
            }
            else {
                const paramkey = key.replace('.', '_');
                this.query.andWhere(`${column} = :${paramkey}`, { [paramkey]: value })
            }

        });

        return this;
    }

    //sorting function
    sort(): this {
        if(this.queryParams.sort) {
            const sortFields = this.queryParams.sort.split(',');
            sortFields.forEach(field => {
                const column = `${this.query.alias}.${field.replace('-','')}`;
                const direction = field.startsWith('-') ? 'DESC' : 'ASC';
                this.query.addOrderBy(column, direction);
            });
        }
        else {
            this.query.addOrderBy(`${this.query.alias}.createdAt`, 'DESC');
        }
        return this;
    }

    //limit fields function
    limitFields(): this {
        if(this.queryParams.fields) {
            const fields = this.queryParams.fields
            .split(',')
            .map(field => `${this.query.alias}.${field}`);

            this.query.select(fields);
        }
        else {
            this.query.select([`${this.query.alias}`]);
        }

        return this;
    }
    //pagination function
    paginate(): this {
        const page = this.queryParams.page * 1 || 1;
        const limit = this.queryParams.limit * 1 || 10;
        const skip = (page -1) * limit;

        this.query.skip(skip).take(limit);

        return this;
    }

}