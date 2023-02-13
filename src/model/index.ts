export type DATE_UNIT = 'DAY' | 'MONTH' | 'YEAR';

export type DATE_GROUP_UNIT = 'WEEK' | 'MONTH' | 'YEAR';

export class DateValue {

    label = ''

    value = ''

    children?: DateValue[] = []
}

export class Task {

    startDate = ''

    endDate = ''

    id = ''

    key = ''

    detail: any = {}
}


export class TableProp {

    label = ''

    value = ''

    width = 80

    visible = true

    disabled = false
}

