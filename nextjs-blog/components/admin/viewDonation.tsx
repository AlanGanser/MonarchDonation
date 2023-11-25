import { Donation, Item, User } from "@prisma/client";
import { format } from "date-fns";
import DeleteButton from "./deleteButton";

const ViewDonation = ({ donation, items, user }: { donation: Donation; items: Item[]; user: User }) => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <div className="px-4 sm:px-0">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">User Donation</h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">User and donation details.</p>
                </div>
                <DeleteButton donationId={donation.id} />
            </div>
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{`${user.firstName} ${user.lastName}`}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.email}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Donation address</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {donation.address}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Date and time</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex space-x-3">
                            <time dateTime={format(donation.date!, "yyyy-MM-dd")}>
                                {" "}
                                {format(donation.date!, "MMMM d, yyyy")}
                            </time>
                            <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                <time dateTime={format(donation.startTime!, "hh:mm a")}>
                                    {format(donation.startTime!, "h:mm")}
                                </time>
                                &nbsp;-&nbsp;
                                <time dateTime={format(donation.endTime!, "hh:mm a")}>
                                    {format(donation.endTime!, "h:mm a")}
                                </time>
                            </span>
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
                        <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Catagory
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Quantity
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {items.map((item) => (
                                        <tr key={item.id} className="even:bg-gray-50">
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                                {item.name}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {item.catagory}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {item.quantity}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
};

export default ViewDonation;
