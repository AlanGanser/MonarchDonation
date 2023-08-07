import { HiOutlineEnvelope } from "react-icons/hi2";
import Form from "./contact-form";

const Mail = () => {
    return (
        <div id="mail" className="relative">
            <div className="absolute inset-0">
                <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50" />
            </div>
            <div className="relative mx-auto max-w-7xl lg:grid lg:grid-cols-5">
                <div className="bg-gray-50 px-6 py-16 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
                    <div className="mx-auto max-w-lg">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Get in touch</h2>
                        <p className="mt-3 text-lg leading-6 text-gray-500">
                            Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat massa dictumst amet.
                            Sapien tortor lacus arcu.
                        </p>
                        <dl className="mt-8 text-base text-gray-500">
                            <dt className="sr-only">Email</dt>
                            <dd className="flex items-center">
                                <HiOutlineEnvelope className="h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                <span className="ml-3">monarchdonations@gmail.com</span>
                            </dd>
                        </dl>
                    </div>
                </div>
                <div className="bg-white px-6 py-16 lg:col-span-3 lg:px-8 lg:py-24 xl:pl-12">
                    <div className="mx-auto max-w-lg lg:max-w-none">
                        <Form />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mail;
