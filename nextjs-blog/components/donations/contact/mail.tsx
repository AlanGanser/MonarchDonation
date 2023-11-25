import { HiOutlineEnvelope } from "react-icons/hi2";

const cards = [
    {
        name: "Monarch Donations",
        email: "monarchdonations@gmail.com",
    },
    {
        name: "Alan Ganser",
        email: "alanganser1@gmail.com",
        phoneNumber: "(915) 792-1701",
    },
    {
        name: "Oscar Gonzalez",
        email: "oscagoa05@gmail.com",
        phoneNumber: "(915) 259-4504",
    },
    {
        name: "Hong Yi Lee",
        email: "hongyilee15@gmail.com",
        phoneNumber: "(915) 291-7039",
    },
];

const Mail = () => {
    return (
        <div className="bg-white py-24 sm:py-32" id="mail">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl space-y-16 divide-y divide-gray-100 lg:mx-0 lg:max-w-none">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Get in touch</h2>
                            <p className="mt-4 leading-7 text-gray-600">
                                Send a message to any of Monarch Donation's officers.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
                            {cards.map(({ name, email, phoneNumber }) => (
                                <div className="rounded-2xl bg-gray-50 p-10">
                                    <h3 className="text-base font-semibold leading-7 text-gray-900">{name}</h3>
                                    <dl className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
                                        <div>
                                            <dt className="sr-only">Email</dt>
                                            <dd>
                                                <a className="font-semibold text-orange-500" href={`mailto:${email}`}>
                                                    {email}
                                                </a>
                                            </dd>
                                        </div>
                                        {phoneNumber && (
                                            <div className="mt-1">
                                                <dt className="sr-only">Phone number</dt>
                                                <dd>{phoneNumber}</dd>
                                            </div>
                                        )}
                                    </dl>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mail;
