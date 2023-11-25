import { addDays, format, isPast, isSameDay, isSameMinute, isWeekend } from "date-fns";

export const getAvailableTimes = (day: Date, unavailableDateTimes: Date[] | undefined, selectedTime?: Date) => {
    if (!isWeekend(day) || isPast(day)) {
        if (selectedTime && isSameDay(day, selectedTime)) {
            return [selectedTime];
        } else {
            return [];
        }
    }

    const times = ["8:00", "8:30", "9:00", "9:30", "10:00", "10:30"].map(
        (time) => new Date(format(day, "yyyy-MM-dd") + " " + time)
    );

    const unavailableDateTimesForDay =
        unavailableDateTimes?.filter((unavailableDate) => isSameDay(day, unavailableDate)) || [];

    const availableTimes = times?.filter((time) => {
        for (let i = 0; i < unavailableDateTimesForDay.length; i++) {
            if (selectedTime) {
                if (
                    isSameMinute(time, unavailableDateTimesForDay[i]) &&
                    !isSameMinute(selectedTime, unavailableDateTimesForDay[i])
                ) {
                    return false;
                }
            } else {
                if (isSameMinute(time, unavailableDateTimesForDay[i])) {
                    return false;
                }
            }
        }
        return true;
    });

    return availableTimes;
};

export const getNextAvailableTime = (today: Date, unavailableDateTimes: Date[] | undefined): Date => {
    let date = today;
    let futureDate = addDays(date, 1);
    let timesOfFutureDate = getAvailableTimes(futureDate, unavailableDateTimes);
    if (timesOfFutureDate.length > 0) {
        return timesOfFutureDate[0];
    } else {
        return getNextAvailableTime(futureDate, unavailableDateTimes);
    }
};
