import Link from "next/link";
import classNames from "classnames";
import {useEffect, useState} from 'react';
import Head from 'next/head';
import axios from "axios";
import {useRouter} from 'next/router';
import Dropdown from "@/components/Dropdown/Dropdown";

export default function HomeLayout({children}) {
    const router = useRouter();

    // const [profileToggle, setProfileToggle] = useState(false);
    const [sidebarToggle, setSidebarToggle] = useState(false);
    const [sidebarData, setSidebarData] = useState([]);
    const [profileData, setProfileData] = useState([]);
    const [sidebarWidth, setSidebarWidth] = useState(false);
    const [showTitle, setShowTitle] = useState(false);
    const [contentMargin, setContentMargin] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState("dark");
    const themeToggle = () => {
        isDarkMode === "dark" ? setIsDarkMode("light") : setIsDarkMode("dark");
    }
    const sidebarHandle = () => {
        setSidebarToggle(!sidebarToggle);
    }
    useEffect(() => {
        const formData = new URLSearchParams();
        formData.append("attributes", ['id', 'title', 'icon', 'link', 'parent_id']);
        axios
            .post("/api/sidebar", formData)
            .then(res => setSidebarData(res.data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        const formData = new URLSearchParams();
        formData.append("attributes", ['profile_photo', 'email', 'name_surname'])

        axios
            .post("/api/profile", formData)
            .then(res => setProfileData((res.data)))
            .catch(err => console.log(err))
    }, [])

    const expandSidebar = () => {
        setSidebarWidth(true);
        setShowTitle(true);
        setContentMargin(true)
    }
    const collapseSidebar = () => {
        setSidebarWidth(false);
        setShowTitle(false);
        setContentMargin(false)
    }

    const handleLogout = async () => {
        try {
            const response = await axios.delete("/api/logout");
            if (response.status === 200) {
                await router.push('/login');
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    }

    // Parent_id'si 0 olanları parent eleman, diğerlerini child eleman olarak ayır
    const parentItems = sidebarData.filter(item => item.parent_id === 0);
    const childItems = sidebarData.filter(item => item.parent_id !== 0);

    return (
        <>
            <Head>
                <meta name="description"
                      content="Avalon Admin Panel, güçlü ve kullanıcı dostu bir yönetim panelidir. Projenizi kolayca yönetebilir, kullanıcıları yönetebilir, veri tabanınızı yönetebilir ve daha fazlasını yapabilirsiniz. Deneyimli bir ekip tarafından geliştirilmiş olan Avalon, size işinizi büyütmeniz ve verimliliğinizi artırmanız için gereken araçları sağlar."/>
            </Head>
            <nav
                className="fixed top-0 z-50 w-full border-b dark:border-gray-700 border-gray-200">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-center sm:justify-start">
                            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar"
                                    aria-controls="logo-sidebar" type="button"
                                    onClick={sidebarHandle}
                                    className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" fillRule="evenodd"
                                          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <Link href="/" className="flex ml-2 md:mr-24">
                                <img
                                    src="https://wxpbrdtmrnvqglioltbm.supabase.co/storage/v1/object/public/avalon/logo.png"
                                    className="h-12 mr-3 sm:h-8"
                                    alt="avalon-logo"/>
                                <span
                                    className="self-center text-xl  font-semibold  hidden sm:block whitespace-nowrap dark:text-white">Avalon Management Systems</span>
                            </Link>
                        </div>

                        <Dropdown buttonText={(
                            <span className="flex text-center">
                                <img className="h-6 h-6 rounded-full"
                                     src={profileData.profile_photo} alt=""/>
                                {/*<span className="ml-2 mt-0.5">{profileData.name_surname}</span>*/}
                            </span>
                        )}
                                  items={[profileData.email, (
                                      <>
                                          <input
                                              type="button"
                                              className="text-red-500"
                                              onClick={handleLogout}
                                              value="Çıkış Yap"
                                              id="Logout"
                                          />
                                      </>
                                  )]}
                                  labels={["", "logout"]}
                        />
                    </div>
                </div>
            </nav>

            <aside id="logo-sidebar"
                   className={classNames("fixed top-0 left-0 h-screen pt-20 bg-white border-r border-gray-200 dark:bg-gray-800  dark:border-gray-700 transition-all",
                       {
                           "w-64": sidebarWidth,
                           "w-16": !sidebarWidth,
                           "-translate-x-full": sidebarToggle,
                       })}
                   aria-label="Sidebar"
                   onMouseEnter={expandSidebar} // mouse hover olduğunda sidebar'ı genişlet
                   onMouseLeave={collapseSidebar} // mouse hover bittiğinde sidebar'ı daralt
                // style={{width: sidebarWidth, transform: `translateX(${sidebarTranslateX})`}}
            >
                <div className="h-full px-3 pb-4 bg-white dark:bg-gray-800 ">
                    <ul className="space-y-2 font-medium">
                        {parentItems.map((parentItem, index) => (
                            <details key={index}
                                     className={`${index > 0 ? ' space-y-4 ' : ''}`}>
                                <summary
                                    className={classNames("flex items-center relative mb-2 cursor-pointer select-none hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg",
                                        {
                                            "active": router.pathname === parentItem.link,
                                        })}
                                >
                                    <Link
                                        className="flex items-center pl-3 p-2 text-gray-900 dark:text-white "
                                        href={parentItem.link}
                                        key={parentItem.id}
                                    >
                                        <i className={parentItem.icon + ' text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'}> </i>
                                        <span className="relative ml-5 whitespace-nowrap"
                                              style={{visibility: showTitle ? "visible" : "hidden"}}> {parentItem.title}
                                        </span>
                                    </Link>

                                    {childItems
                                        .filter(childItem => childItem.parent_id === parentItem.id)
                                        .map(childItem => (
                                            <i
                                                key={childItem.id}
                                                style={{visibility: showTitle ? "visible" : "hidden"}}
                                                className="fa-solid fa-caret-down absolute right-3"></i>
                                        ))}
                                </summary>

                                {childItems
                                    .filter(childItem => childItem.parent_id === parentItem.id)
                                    .map(childItem => (
                                        <Link
                                            style={{visibility: showTitle ? "visible" : "hidden"}}
                                            className={classNames(" flex items-center pl-3 py-1 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 ",
                                                {
                                                    "active": router.pathname === childItem.link,
                                                })}
                                            href={childItem.link}
                                            key={childItem.id}
                                        >
                                            <i className={childItem.icon + ' text-gray-500 ml-10  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'}> </i>
                                            <span className="relative ml-5 whitespace-nowrap"
                                                  style={{visibility: showTitle ? "visible" : "hidden"}}
                                            > {childItem.title}
                                        </span>
                                        </Link>
                                    ))}
                            </details>
                        ))}

                        {/*<li className="mt-auto grid absolute bottom-4 w-[90%]">*/}
                        {/*    <button*/}
                        {/*        onClick={themeToggle}*/}
                        {/*        className="flex items-center pl-3 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600">*/}
                        {/*        {isDarkMode === "dark" && (*/}
                        {/*            <>*/}
                        {/*                <i className="fa fa-moon text-zinc-300"></i>*/}
                        {/*                <span className={classNames("ml-5", {*/}
                        {/*                    'hidden': !showTitle*/}
                        {/*                })}>*/}
                        {/*                    Dark*/}
                        {/*                </span>*/}
                        {/*            </>*/}
                        {/*        )}*/}
                        {/*        {isDarkMode === "light" && (*/}
                        {/*            <>*/}
                        {/*                <i className="fa fa-sun text-amber-300"></i>*/}
                        {/*                <span className={classNames("ml-5", {*/}
                        {/*                    'hidden': !showTitle*/}
                        {/*                })}>*/}
                        {/*                    Light*/}
                        {/*                </span>*/}
                        {/*            </>*/}
                        {/*        )}*/}
                        {/*    </button>*/}
                        {/*</li>*/}
                    </ul>
                </div>
            </aside>

            <div className={classNames("p-4 min-h-screen transition-all", {
                "sm:ml-64": contentMargin,
                "ml-16": !contentMargin,
                "!ml-0": sidebarToggle,
            })}>
                <div className="p-4 rounded-lg dark:border-gray-700 mt-14 mx-auto md:mx-24"
                >
                    {children}
                </div>
            </div>
        </>
    )
}

