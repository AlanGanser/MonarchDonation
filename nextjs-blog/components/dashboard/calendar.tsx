"use client";

import { forwardRef, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { HiChevronLeft, HiChevronRight, HiCheck } from "react-icons/hi2";
import {
    add,
    addMinutes,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    getDay,
    isEqual,
    isPast,
    isSameMonth,
    isToday,
    isWeekend,
    parse,
    startOfDay,
    startOfWeek,
    toDate,
} from "date-fns";
import { getAvailableTimes } from "./availableTimes";

const colStartClasses = ["", "col-start-2", "col-start-3", "col-start-4", "col-start-5", "col-start-6", "col-start-7"];

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}

const Calendar = forwardRef<
    HTMLButtonElement,
    {
        today: Date;
        unavailableDateTimes: Date[] | undefined;
        onChange: (value: number) => void;
        value: number;
    }
>(({ today, unavailableDateTimes, onChange, value }, forwardRef) => {

    const [selectedDay, setSelectedDay] = useState(startOfDay(toDate(value)));
    const [availableDayTimes, setAvailableDayTimes] = useState<Date[]>(getAvailableTimes(startOfDay(toDate(value)), unavailableDateTimes, toDate(value)));
    const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
    const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

    // arrow cannot go to the past
    const leftArrowDisabled = isEqual(
        add(parse(format(today, "MMM-yyyy"), "MMM-yyyy", new Date()), { months: -1 }),
        add(firstDayCurrentMonth, { months: -1 })
    );

    // arrow cannot go past the next two months
    const rightArrowDisabled = isEqual(
        add(parse(format(today, "MMM-yyyy"), "MMM-yyyy", new Date()), { months: 3 }),
        add(firstDayCurrentMonth, { months: 1 })
    );

    const newDays = eachDayOfInterval({
        start: startOfWeek(firstDayCurrentMonth),
        end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
    });

    const previousMonth = () => {
        const firstDayPreviousMonth = add(firstDayCurrentMonth, { months: -1 });
        setCurrentMonth(format(firstDayPreviousMonth, "MMM-yyyy"));
    };
    const nextMonth = () => {
        const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
        setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
    };

    return (
        <>
            <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200 mt-8">
                <div className="md:pr-14">
                    <div className="flex items-center">
                        <h2 className="flex-auto text-sm font-semibold text-gray-900">
                            {format(firstDayCurrentMonth, "MMMM yyyy")}
                        </h2>
                        <button
                            onClick={previousMonth}
                            disabled={leftArrowDisabled}
                            type="button"
                            className={classNames(
                                "-my-1.5 flex flex-none items-center justify-center p-1.5",
                                leftArrowDisabled ? "text-gray-300" : "text-gray-400 hover:text-gray-500"
                            )}
                        >
                            <span className="sr-only">Previous month</span>
                            <HiChevronLeft className="h-5 w-5" aria-hidden="true" />
                        </button>
                        <button
                            onClick={nextMonth}
                            disabled={rightArrowDisabled}
                            type="button"
                            className={classNames(
                                "-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5",
                                rightArrowDisabled ? "text-gray-300" : "text-gray-400 hover:text-gray-500"
                            )}
                        >
                            <span className="sr-only">Next month</span>
                            <HiChevronRight className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
                        <div>S</div>
                        <div>M</div>
                        <div>T</div>
                        <div>W</div>
                        <div>T</div>
                        <div>F</div>
                        <div>S</div>
                    </div>
                    <div className="mt-2 grid grid-cols-7 text-sm">
                        {newDays.map((day, dayIdx) => {
                            const dayDisabled = !isSameMonth(day, firstDayCurrentMonth);
                            const availableWeekend =
                                isSameMonth(day, firstDayCurrentMonth) && !isPast(day) && isWeekend(day);
                            const refSpread = isEqual(day, selectedDay) ? { ref: forwardRef } : {};
                            return (
                                <div
                                    key={day.toString()}
                                    className={classNames(dayIdx === 0 && colStartClasses[getDay(day)], "py-2")}
                                >
                                    <button
                                        type="button"
                                        disabled={dayDisabled}
                                        onClick={() => {
                                            setSelectedDay(day);
                                            setAvailableDayTimes(getAvailableTimes(day, unavailableDateTimes, toDate(value)));
                                        }}
                                        {...refSpread}
                                        className={classNames(
                                            // isEqual(day, selectedDay) && "text-white",
                                            isToday(day) && !isEqual(day, selectedDay) && "text-orange-500",
                                            !isEqual(day, selectedDay) &&
                                                !isToday(day) &&
                                                isSameMonth(day, firstDayCurrentMonth) &&
                                                "text-gray-900",
                                            !isEqual(day, selectedDay) &&
                                                !isToday(day) &&
                                                !isSameMonth(day, firstDayCurrentMonth) &&
                                                "text-gray-400",
                                            isEqual(day, selectedDay) &&
                                                !isToday(day) &&
                                                "outline-none ring ring-orange-500 text-orange-500",
                                            isEqual(day, selectedDay) &&
                                                isToday(day) &&
                                                "outline-none ring ring-orange-500 ring-offset-1",
                                            availableWeekend && "bg-gray-200 font-semibold",
                                            isToday(day) && "font-semibold bg-orange-500 text-white",
                                            "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                                        )}
                                    >
                                        <time dateTime={format(day, "yyyy-MM-dd")}>{format(day, "d")}</time>
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <section className="mt-12 md:mt-0 md:pl-14">
                    <RadioGroup value={value} onChange={onChange}>
                        <RadioGroup.Label className="text-base font-semibold leading-6 text-gray-900">
                            Available times for{" "}
                            <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                                {" "}
                                {format(selectedDay, "MMMM d, yyyy")}
                            </time>
                            :
                        </RadioGroup.Label>

                        {availableDayTimes.length < 1 ? (
                            <p className="pl-3 text-gray-500 italic mt-4">No times available</p>
                        ) : (
                            <div className="mt-4 grid grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-3 sm:gap-x-4">
                                {availableDayTimes.map((time, i) => {
                                    return (
                                        <RadioGroup.Option
                                            key={i}
                                            value={time.valueOf()}
                                            className={({ active }) =>
                                                classNames(
                                                    active
                                                        ? "border-orange-500 ring-2 ring-orange-500"
                                                        : "border-gray-300",
                                                    "relative flex cursor-pointer justify-between rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                                                )
                                            }
                                        >
                                            {({ checked, active }) => {
                                                return (
                                                    <>
                                                        <RadioGroup.Label
                                                            as="span"
                                                            className="block text-sm font-medium text-gray-900"
                                                        >
                                                            {format(time, "h:mm")} -{" "}
                                                            {format(addMinutes(time, 30), "h:mm a")}
                                                        </RadioGroup.Label>

                                                        <HiCheck
                                                            className={classNames(
                                                                !checked ? "invisible" : "",
                                                                "h-5 w-5 text-orange-500 shrink-0"
                                                            )}
                                                            aria-hidden="true"
                                                        />

                                                        <span
                                                            className={classNames(
                                                                active ? "border" : "border-2",
                                                                checked ? "border-orange-500" : "border-transparent",
                                                                "pointer-events-none absolute -inset-px rounded-lg"
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                    </>
                                                );
                                            }}
                                        </RadioGroup.Option>
                                    );
                                })}
                            </div>
                        )}
                    </RadioGroup>
                </section>
            </div>
        </>
    );
});

export default Calendar;
