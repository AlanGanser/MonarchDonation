import { HiCalendar, HiMapPin, HiXMark } from "react-icons/hi2";
import DeleteButton from "./deleteButton";
import prisma from "../../lib/prisma";
import { format } from "date-fns";
import Link from "next/link";

const Donations = async () => {
    const donations = await prisma.donation.findMany({
        select: {
            id: true,
            user: true,
            date: true,
            startTime: true,
            endTime: true,
            address: true,
        },
    });

    return (
        <div>
            <h2 className="text-base font-semibold leading-6 text-gray-900">Upcoming donations</h2>
            <div className="mt-4">
                {donations.map((donation) => (
                    <li key={donation.id} className="relative flex space-x-6 py-6 xl:static">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                            {donation.user.lastName?.charAt(0)}
                        </span>
                        <div className="flex-auto">
                            <Link href={`/admin/donations/${donation.id}`}>
                                <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0 hover:underline">
                                    {donation.user.firstName &&
                                        donation.user.lastName &&
                                        `${donation.user.firstName} ${donation.user.lastName}`}
                                </h3>
                            </Link>
                            <Link href={`mailto:${donation.user.email}`}>
                                <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0 hover:underline">
                                    {donation.user.email}
                                </h3>
                            </Link>
                            <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row">
                                <div className="flex items-start space-x-3">
                                    <dt className="mt-0.5">
                                        <span className="sr-only">Date</span>
                                        <HiCalendar className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </dt>
                                    <dd className="flex space-x-3">
                                        <time dateTime={format(new Date(donation.date!), "yyyy-MM-dd")}>
                                            {" "}
                                            {format(new Date(donation.date!), "MMMM d, yyyy")}
                                        </time>
                                        <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                            <time dateTime={format(new Date(donation.startTime!), "hh:mm a")}>
                                                {format(new Date(donation.startTime!), "h:mm")}
                                            </time>
                                            &nbsp;-&nbsp;
                                            <time dateTime={format(new Date(donation.endTime!), "hh:mm a")}>
                                                {format(new Date(donation.endTime!), "h:mm a")}
                                            </time>
                                        </span>
                                    </dd>
                                </div>
                                <div className="mt-2 flex items-start space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                                    <dt className="mt-0.5">
                                        <span className="sr-only">Location</span>
                                        <HiMapPin className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </dt>
                                    <dd>{donation.address}</dd>
                                </div>
                            </dl>
                        </div>
                        <div className="absolute right-0 top-6 xl:relative xl:right-auto xl:top-auto xl:self-center">
                            <DeleteButton donationId={donation.id} />
                        </div>
                    </li>
                ))}
            </div>
        </div>
    );
};

export default Donations;
