export type DATE_UNIT = 'DAY' | 'MONTH' | 'YEAR';

export type DATE_GROUP_UNIT = 'WEEK' | 'MONTH' | 'YEAR';

export class DateValue {

    label = ''

    value = ''

    children?: DateValue[] = []
}

