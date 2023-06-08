import Link from "next/link";
import classNames from "classnames";
import {useEffect, useState} from 'react';
import Head from 'next/head';
import axios from "axios";

export default function HomeLayout({children}) {
    const [profileToggle, setProfileToggle] = useState(false);
    const [sidebarToggle, setSidebarToggle] = useState(false);
    const [sidebarData, setSidebarData] = useState([]);
    const profileHandle = () => {
        setProfileToggle(!profileToggle);
    }
    const sidebarHandle = () => {
        setSidebarToggle(!sidebarToggle);
    }

    useEffect(() => {
        axios('/api/sidebar/modules')
            .then(response => setSidebarData(JSON.parse(response.data)))
            .catch(err => console.log(err));
    }, []);

    return (
        <>
            <Head>
                <meta name="description"
                      content="Avalon Admin Panel, güçlü ve kullanıcı dostu bir yönetim panelidir. Projenizi kolayca yönetebilir, kullanıcıları yönetebilir, veri tabanınızı yönetebilir ve daha fazlasını yapabilirsiniz. Deneyimli bir ekip tarafından geliştirilmiş olan Avalon, size işinizi büyütmeniz ve verimliliğinizi artırmanız için gereken araçları sağlar."/>
            </Head>
            <nav
                className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-center sm:justify-start">
                            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar"
                                    onClick={sidebarHandle}
                                    aria-controls="logo-sidebar" type="button"
                                    className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path clip-rule="evenodd" fill-rule="evenodd"
                                          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <Link href="/" className="flex ml-2 md:mr-24">
                                <img src="https://storage.googleapis.com/yunusemretopcu.appspot.com/logo.png"
                                     className="h-12 mr-3 sm:h-8"
                                     alt="avalon-logo"/>
                                <span
                                    className="self-center text-xl  font-semibold  hidden sm:block whitespace-nowrap dark:text-white">Avalon Management Systems</span>
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ml-3">
                                <div>
                                    <button type="button"
                                            onClick={profileHandle}
                                            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                            aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                        <span className="sr-only">Open user menu</span>
                                        <img className="w-8 h-8 rounded-full"
                                             src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                             alt="user photo"/>
                                    </button>
                                </div>
                                <div
                                    className={classNames("z-50 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600", {
                                        "hidden": !profileToggle,
                                        "fixed top-12 right-0": profileToggle
                                    })}
                                    id="dropdown-user">
                                    <div className="px-4 py-3" role="none">
                                        <p className="text-sm text-gray-900 dark:text-white" role="none">
                                            Neil Sims
                                        </p>
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                                           role="none">
                                            neil.sims@flowbite.com
                                        </p>
                                    </div>
                                    <ul className="py-1" role="none">
                                        <li>
                                            <Link href="#"
                                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                                  role="menuitem">Profile</Link>
                                        </li>
                                        <li>
                                            <Link href="#"
                                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                                  role="menuitem">Sign out</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside id="logo-sidebar"
                   className={classNames("fixed top-0 left-0 sm:-translate-x-0 z-40 w-64 h-screen pt-20 transition-transform  bg-white border-r border-gray-200 dark:bg-gray-800  dark:border-gray-700",
                       {
                           "-translate-x-full": sidebarToggle,
                       })}
                   aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            {sidebarData.map(item => (
                                <Link href={item.link}
                                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                      key={item.id}
                                >
                                    <i className={item.icon + ' text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'}> </i>
                                    <span className="ml-5">{item.title}</span>
                                </Link>
                            ))}
                        </li>
                    </ul>
                </div>
            </aside>

            <div className="p-4 sm:ml-64">
                <div className="p-4 rounded-lg dark:border-gray-700 mt-14">
                    {children}
                </div>
            </div>
        </>
    )
}
