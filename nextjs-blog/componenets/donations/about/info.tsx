import { IoGift } from "react-icons/io5";
import { FaHandsHelping } from "react-icons/fa";
import { RiSpeakFill } from "react-icons/ri";

const features = [
    {
        name: "Donate",
        description: "Donate using this website to provide aid to the homeless and migrants of El Paso.",
        icon: IoGift,
    },
    // {
    //     name: "Volunteer",
    //     description: "Contribute to the success of our organization by volunteering to drive the donations to their designated migrant shelters.",
    //     icon: FaHandsHelping,
    // },
    {
        name: "Spread the word",
        description: "Share our mission with your network to raise awareness about our cause and help us make a greater impact.",
        icon: RiSpeakFill,
    },
    // {
    //     name: "What happens after",
    //     description: "we get thrown away after being used",
    //     icon: PiClockClockwiseBold,
    // },
];

const Info = () => {
    return (
        <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        How you can get involved
                    </h2>
                    <dl className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
                        {features.map((feature) => (
                            <div key={feature.name}>
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                                        <feature.icon className="h-6 w-6 text-orange-500" aria-hidden="true" />
                                    </div>
                                    {feature.name}
                                </dt>
                                <dd className="mt-1 text-base leading-7 text-gray-600">{feature.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default Info;
