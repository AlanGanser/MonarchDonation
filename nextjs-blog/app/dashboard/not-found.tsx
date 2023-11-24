import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";

export default async function NotFound() {
    return (
        <>
            <div className="flex min-h-full flex-col bg-white pb-12 pt-16">
                <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-6 lg:px-8">
                    <div className="flex flex-shrink-0 justify-center">
                        <Link href="/" className="inline-flex">
                            <span className="sr-only">Your Company</span>
                            <Image
                                height={48}
                                width={48}
                                className="h-12 w-auto"
                                src="/images/monarch-logo.png"
                                alt="Monarch donations logo"
                            />
                        </Link>
                    </div>
                    <div className="py-16">
                        <div className="text-center">
                            <p className="text-base font-semibold text-orange-500">404</p>
                            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                                Page not found.
                            </h1>
                            <p className="mt-2 text-base text-gray-500">
                                Sorry, we couldn't find the page you're looking for.
                            </p>
                            <div className="mt-6">
                                <Link href="/dashboard" className="text-base font-medium text-orange-500 hover:text-orange-400">
                                    Go back to dashboard
                                    <span aria-hidden="true"> &rarr;</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
                <footer className="mx-auto w-full max-w-7xl flex-shrink-0 px-6 lg:px-8">
                    <nav className="flex justify-center space-x-4">
                        <Link href="mailto:monarchdonations@gmail.com" className="text-sm font-medium text-gray-500 hover:text-gray-600">
                            Contact Support
                        </Link>
                        <span className="inline-block border-l border-gray-300" aria-hidden="true" />
                        <Link href="https://www.instagram.com/monarchdonations/" className="text-sm font-medium text-gray-500 hover:text-gray-600">
                            Instagram
                        </Link>
                    </nav>
                </footer>
            </div>
        </>
    );
}
