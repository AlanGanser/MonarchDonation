import { Donation, Item } from "@prisma/client";
import { format } from "date-fns";
import DonationListActions from "./donationListActions";
import DonationItemsList from "./donationItemsList";

const DonationList = ({ donations }: { donations: { donation: Donation; items: Item[] }[] }) => {
    return (
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {donations.length < 1 ? (
                <p className="pl-3 text-gray-500 italic mt-2">No upcoming donations</p>
            ) : (
                donations.map((donationObj) => (
                    <li
                        key={donationObj.donation.id}
                        className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
                    >
                        <div className="flex w-full items-start justify-between space-x-6 p-6">
                            <div className="flex-1 truncate">
                                <div className="flex items-center space-x-3">
                                    <h3 className="truncate text-sm font-medium text-gray-900">
                                        <time dateTime={format(donationObj.donation.date!, "yyyy-MM-dd")}>
                                            {/* TODO */}
                                            {" "}
                                            {format(donationObj.donation.date!, "MMMM d, yyyy")}
                                        </time>
                                    </h3>
                                    <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                        <time dateTime={format(donationObj.donation.startTime!, "hh:mm a")}>
                                            {format(donationObj.donation.startTime!, "h:mm")}
                                        </time>
                                        &nbsp;-&nbsp;
                                        <time dateTime={format(donationObj.donation.endTime!, "hh:mm a")}>
                                            {format(donationObj.donation.endTime!, "h:mm a")}
                                        </time>
                                    </span>
                                </div>
                                <p className="truncate mt-1 text-sm text-gray-500">
                                    {donationObj.items
                                        .map(({ name, quantity }) => quantity + " " + name)
                                        .join(", ")
                                        .replace(/, ([^,]*)$/, " and $1")}
                                </p>
                            </div>
                            <DonationListActions donationId={donationObj.donation.id} />
                        </div>
                    </li>
                ))
            )}
        </ul>
    );
};

export default DonationList;
