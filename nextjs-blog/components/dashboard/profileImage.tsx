"use client";

import { Fragment, useState, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { HiXMark, HiPhoto } from "react-icons/hi2";
import { BsExclamationLg } from "react-icons/bs";
import { User } from "@clerk/nextjs/dist/types/server";
import { useUser } from "@clerk/nextjs";
import { revalidate } from "./actions";
import { useTransition } from "react";
import LoadingSpinner from "../general/loadingSpinner";

const ProfileImage = ({ user }: { user: User }) => {
    const [changeMenuOpen, setChangeMenuOpen] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const [isPending, startTransition] = useTransition();
    const uploadButtonRef = useRef(null);
    const { user: clientUser } = useUser();

    const changeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            try {
                await clientUser?.setProfileImage({
                    file: e.target.files[0],
                });
                await revalidate();
                setChangeMenuOpen(false);
            } catch (err: any) {
                console.log(err);
                if (err.errors[0].message == "unsupported image type") {
                    setErrMessage("Unsupported image type");
                } else {
                    setErrMessage(err.errors[0].message);
                }
            }
        }
    };

    return (
        <>
            <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                Photo
            </label>
            <div className="mt-2 flex items-center gap-x-3">
                <img className="h-12 w-12 text-gray-300 rounded-full" aria-hidden="true" src={user.imageUrl} />
                <button
                    type="button"
                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    onClick={() => setChangeMenuOpen(true)}
                >
                    Change
                </button>
            </div>
            <Transition.Root show={changeMenuOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setChangeMenuOpen} initialFocus={uploadButtonRef}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center px-4 pb-4 pt-5 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                    <div className="absolute right-0 top-0 pr-4 pt-4 block">
                                        <button
                                            type="button"
                                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                                            onClick={() => {
                                                setChangeMenuOpen(false);
                                            }}
                                        >
                                            <span className="sr-only">Close</span>
                                            <HiXMark className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    <div className="text-center mb-5">
                                        <Dialog.Title as="h1" className="text-lg font-semibold leading-6 text-gray-900">
                                            Upload photo
                                        </Dialog.Title>
                                    </div>

                                    {errMessage && (
                                        <div className="flex justify-center items-center gap-1 py-1 px-2 font-semibold font-base text-red-600 bg-red-100 rounded-md text-sm mb-4">
                                            <BsExclamationLg size={25} className="mr-3 flex-shrink-0" />
                                            <p className="text-center">{errMessage}</p>
                                        </div>
                                    )}

                                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                        <div className="text-center">
                                            <HiPhoto className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                            {isPending ? (
                                                <div className="flex justify-center mt-5">
                                                    <LoadingSpinner />
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                                                        <label
                                                            htmlFor="file-upload"
                                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-500 focus-within:ring-offset-2 hover:text-orange-400"
                                                            ref={uploadButtonRef}
                                                        >
                                                            <span>Upload a file</span>
                                                            <input
                                                                id="file-upload"
                                                                name="file-upload"
                                                                type="file"
                                                                accept="image/jpeg,image/png,image/gif,image/webp"
                                                                onChange={(e) => startTransition(() => changeImg(e))}
                                                                className="sr-only"
                                                            />
                                                        </label>
                                                        {/* <p className="pl-1">or drag and drop</p> */}
                                                    </div>
                                                    <p className="text-xs leading-5 text-gray-600">
                                                        JPG, PNG, GIF, or WEBP up to 10MB
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
};

export default ProfileImage;
