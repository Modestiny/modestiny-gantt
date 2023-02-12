import dayjs from 'dayjs';
import { DATE_GROUP_UNIT, DATE_UNIT, DateValue } from '../model';


export const getDateList = (startTime: string, endTime: string, groupUnit: DATE_GROUP_UNIT, unit: DATE_UNIT) => {

    const dateStart = dayjs(startTime);
    const dateEnd = dayjs(endTime);

    let obj: DateValue[] = [];

    // MONTH /  DAY
    if (groupUnit == 'MONTH' && unit == 'DAY') {
        const count = dateEnd.diff(dateStart, "month");
        for (let i = 0; i < count; i++) {
            const month = dateStart.add(i, "month").format("YYYY-MM");
            const monthDays = dayjs(month).daysInMonth();
            const children = new Array(monthDays).fill(null).map((v, i) => {
                return Object.assign(new DateValue, { label: i + 1 })
            });
            obj.push(Object.assign(new DateValue, { label: month, children }))
        }
    }

    // WEEK /  DAY
    if (groupUnit == 'WEEK' && unit == 'DAY') {
        const startDate = dateStart.startOf('week');
        const endDate = dateEnd.endOf('week');
        const weekCount = endDate.diff(startDate, "week");
        for (let i = 0; i <= weekCount + 1; i++) {
            const dateWeek = startDate.add(i - 1, 'week').format('YYYY-MM-DD');
            const dateWeekNext = startDate.add(i, 'week').format('YYYY-MM-DD');
            const children = new Array(7).fill(null).map((v, i) => {
                const date = dayjs(dateWeek).add(i + 1, "day");
                return Object.assign(new DateValue, { label: date.date(), value: date.format('YYYY-MM-DD') })
            });
            const label = `${dateWeek}~${dateWeekNext}`;
            obj.push(Object.assign(new DateValue, { label, children }))
        }
    }
    console.log('obj: ', obj);

    return obj;
}


export const getBarOffset = (startTime: string, endTime: string, dateList: DateValue[], unit: DATE_UNIT, cellWidth: number) => {
    if (unit === 'DAY') {
        const dateStart = dayjs(startTime);
        const dateEnd = dayjs(endTime);
        const dayCount = dateEnd.diff(dateStart, "day");
        const dateListStart = dayjs(dateList[0]?.children?.[0].value);
        const dayStartCount = dateStart.diff(dateListStart, "day");

        return {
            left: `${dayStartCount * cellWidth}px`,
            width: `${dayCount * cellWidth}px`
        }
    }
}
