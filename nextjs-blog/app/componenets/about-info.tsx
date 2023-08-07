import { BsFillPersonFill } from "react-icons/bs";
import { MdOutlineWork } from "react-icons/md";
import { FaQuestion } from "react-icons/fa";
import { PiClockClockwiseBold } from "react-icons/pi";

const features = [
    {
        name: "Who we are",
        description: "We are a group of high school kids combining our skills for the better of the world",
        icon: BsFillPersonFill,
    },
    {
        name: "What are we doing",
        description: "nothing much",
        icon: MdOutlineWork,
    },
    {
        name: "Why are we doing this",
        description: "forced by large educational coroperation as participants of a pyramid scheme",
        icon: FaQuestion,
    },
    {
        name: "What happens after",
        description: "we get thrown away after being used",
        icon: PiClockClockwiseBold,
    },
];

const Info = () => {
    return (
        <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Stay on top of customer support
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
