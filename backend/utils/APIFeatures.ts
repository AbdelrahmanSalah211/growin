import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

interface QueryParams {
  page?: string;
  sort?: string;
  limit?: string;
  fields?: string;
  minRating?: string;
  maxRating?: string;
  category?: string;
  level?: string;
  minPrice?: string;
  maxPrice?: string;
  title?: string;
  [key: string]: any;
}

export class APIFeatures<Entity extends ObjectLiteral> {
  private query: SelectQueryBuilder<Entity>;
  private queryParams: QueryParams;

  constructor(query: SelectQueryBuilder<Entity>, queryParams: QueryParams) {
    this.query = query;
    this.queryParams = queryParams;
  }

  filter(): this {
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    const filters = { ...this.queryParams };
    excludedFields.forEach(field => delete filters[field]);

    Object.keys(filters).forEach(key => {
      const value = filters[key];

      switch (key) {
        case 'minRating':
          this.query.andWhere(`(${this.query.alias}."ratingSum"::float / NULLIF(${this.query.alias}.numberOfReviewers, 0)) >= :minRating`,
            { minRating: parseFloat(value) });
          break;
        case 'maxRating':
          this.query.andWhere(`(${this.query.alias}."ratingSum"::float / NULLIF(${this.query.alias}.numberOfReviewers, 0)) <= :maxRating`,
            { maxRating: parseFloat(value) });
          break;
        case 'category':
          this.query.andWhere(`course_category.title = :category`, { category: value });
          break;
        case 'level':
          if (value.includes(',')) {
            // Multiple levels: "BEGINNER,INTERMEDIATE"
            const levels = value.split(',').map((l: string) => l.trim());
            this.query.andWhere(`${this.query.alias}.level IN (:...levels)`, { levels });
          } else {
            // Single level
            this.query.andWhere(`${this.query.alias}.level = :level`, { level: value });
          }
          break;
        case 'minPrice':
          this.query.andWhere(`${this.query.alias}.price >= :minPrice`, { minPrice: parseFloat(value) });
          break;
        case 'maxPrice':
          this.query.andWhere(`${this.query.alias}.price <= :maxPrice`, { maxPrice: parseFloat(value) });
          break;
        case 'title':
          this.query.andWhere(`${this.query.alias}.title ILIKE :title`, { title: `%${value}%` });
          break;
        default:
          {
            const [relation, field] = key.includes('.') ? key.split('.') : [null, null];
            const column = relation ? `${relation}.${field}` : `${this.query.alias}.${key}`;

            if (typeof value === 'object') {
              Object.entries(value).forEach(([operator, opValue]) => {
                const paramkey = key.replace('.', '_') + '_' + operator;
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
          }
      }
    });

    return this;
  }

  sort(): this {
    if(this.queryParams.sort) {
      const sortFields = this.queryParams.sort.split(',');
      sortFields.forEach(field => {
        let column: string;
        let direction: 'ASC' | 'DESC' = 'ASC';

        if (field.startsWith('-')) {
          direction = 'DESC';
          field = field.substring(1);
        }

        switch (field) {
          case 'avgRating':
            column = `"avgRating"`;
            break;
          case 'category':
            column = `course_category.title`;
            break;
          default:
            column = `${this.query.alias}.${field}`;
        }

        this.query.addOrderBy(column, direction);
      });
    }
    else {
      this.query.addOrderBy(`${this.query.alias}.createdAt`, 'DESC');
    }
    return this;
  }

  limitFields(): this {
  if (this.queryParams.fields) {
    const fields = this.queryParams.fields.split(',').map(field => {
      switch (field) {
        case 'avgRating':
          return `(${this.query.alias}."ratingSum"::float / NULLIF(${this.query.alias}.numberOfReviewers, 0)) as "avgRating"`;
        default:
          return `${this.query.alias}.${field}`;
      }
    });

    this.query.select(fields);
  } else {
    this.query.addSelect(
      `(${this.query.alias}."ratingSum"::float / NULLIF(${this.query.alias}.numberOfReviewers, 0))`,
      'avgRating'
    );
  }

  return this;
}

  paginate(): this {
    const page = this.queryParams.page ? parseInt(this.queryParams.page, 10) : 1;
    const limit = this.queryParams.limit ? parseInt(this.queryParams.limit, 10) : 10;
    const skip = (page - 1) * limit;

    this.query.skip(skip).take(limit);

    return this;
  }

  async getCount(): Promise<number> {
    return await this.query.getCount();
  }

  async execute(): Promise<Entity[]> {
    return await this.query.getMany();
  }
}