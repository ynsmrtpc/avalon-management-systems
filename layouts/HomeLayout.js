import Link from "next/link";
import classNames from "classnames";
import {useEffect, useState} from "react";
import Head from "next/head";
import axios from "axios";
import {useRouter} from "next/router";
import Dropdown from "@/components/Dropdown/Dropdown";
import fn_change_theme from "@/utils/changeTheme";
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
    };
    const sidebarHandle = () => {
        setSidebarToggle(!sidebarToggle);
    };
    useEffect(() => {
        const formData = new URLSearchParams();
        formData.append("attributes", ["id", "title", "icon", "link", "parent_id"]);
        axios
            .post("/api/sidebar", formData)
            .then((res) => setSidebarData(res.data))
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        const formData = new URLSearchParams();
        formData.append("attributes", ["profile_photo", "email", "name_surname"]);

        axios
            .post("/api/profile", formData)
            .then((res) => setProfileData(res.data))
            .catch((err) => console.log(err));
    }, []);

    const expandSidebar = () => {
        setSidebarWidth(true);
        setShowTitle(true);
        setContentMargin(true);
    };
    const collapseSidebar = () => {
        setSidebarWidth(false);
        setShowTitle(false);
        setContentMargin(false);
    };

    const handleLogout = async () => {
        try {
            const response = await axios.delete("/api/logout");
            if (response.status === 200) {
                await router.push("/login");
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    // Parent_id'si 0 olanları parent eleman, diğerlerini child eleman olarak ayır
    const parentItems = sidebarData.filter((item) => item.parent_id === 0);
    const childItems = sidebarData.filter((item) => item.parent_id !== 0);

    return (
        <>
            <Head>
                <meta
                    name="description"
                    content="Avalon Admin Panel, güçlü ve kullanıcı dostu bir yönetim panelidir. Projenizi kolayca yönetebilir, kullanıcıları yönetebilir, veri tabanınızı yönetebilir ve daha fazlasını yapabilirsiniz. Deneyimli bir ekip tarafından geliştirilmiş olan Avalon, size işinizi büyütmeniz ve verimliliğinizi artırmanız için gereken araçları sağlar."
                />
            </Head>
            <nav className="fixed top-0 z-50 w-full border-b bg-base-200 ">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-center sm:justify-start">
                            <button
                                data-drawer-target="logo-sidebar"
                                data-drawer-toggle="logo-sidebar"
                                aria-controls="logo-sidebar"
                                type="button"
                                onClick={sidebarHandle}
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            >
                                <span className="sr-only">Open sidebar</span>
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                    ></path>
                                </svg>
                            </button>
                            <Link href="/" className="flex ml-2 md:mr-24">
                                <img
                                    src="https://wxpbrdtmrnvqglioltbm.supabase.co/storage/v1/object/public/avalon/logo.png"
                                    className="h-12 mr-3 sm:h-8"
                                    alt="avalon-logo"
                                />
                                <span
                                    className="self-center text-xl font-semibold hidden sm:block whitespace-nowrap text-base-content">
                  Avalon Management Systems
                </span>
                            </Link>
                        </div>

                        <Dropdown
                            buttonText={
                                <span className="flex text-center">
                  <img
                      className="h-6 rounded-full"
                      src={profileData.profile_photo}
                      alt=""
                  />
                  <span className="ml-2 mt-0.5">
                    {profileData.name_surname}
                  </span>
                </span>
                            }
                            items={[
                                profileData.email,
                                <>
                                    <input
                                        type="button"
                                        className="text-red-500"
                                        onClick={handleLogout}
                                        value="Çıkış Yap"
                                        id="Logout"
                                    />
                                </>,
                            ]}
                            labels={["", "logout"]}
                        />
                    </div>
                </div>
            </nav>

            <aside
                id="logo-sidebar"
                className={classNames(
                    "fixed top-0 left-0 h-screen pt-20 rounded-box bg-base-200 transition-all",
                    {
                        "w-64": sidebarWidth,
                        "w-16": !sidebarWidth,
                        "-translate-x-full": sidebarToggle,
                    }
                )}
                aria-label="Sidebar"
                onMouseEnter={expandSidebar} // mouse hover olduğunda sidebar'ı genişlet
                onMouseLeave={collapseSidebar} // mouse hover bittiğinde sidebar'ı daralt
            >
                <div className="h-full px-3 pb-4 bg-base-200 text-base-content">
                    <ul className="space-y-2 font-medium">
                        {parentItems.map((parentItem, index) => (
                            <details
                                key={index}
                                className={`${index > 0 ? " space-y-4 " : ""}`}
                            >
                                <summary
                                    className={classNames(
                                        "flex items-center relative mb-2 cursor-pointer select-none hover:bg-base-300 rounded-lg",
                                        {
                                            active: router.pathname === parentItem.link,
                                        }
                                    )}
                                >
                                    <Link
                                        className="flex items-center pl-3 p-2  "
                                        href={parentItem.link}
                                        key={parentItem.id}
                                    >
                                        <i
                                            className={
                                                parentItem.icon +
                                                " transition duration-75 group-hover:bg-base-300 text-base-content"
                                            }
                                        >
                                            {" "}
                                        </i>
                                        <span
                                            className="relative ml-5 whitespace-nowrap"
                                            style={{visibility: showTitle ? "visible" : "hidden"}}
                                        >
                      {" "}
                                            {parentItem.title}
                    </span>
                                    </Link>

                                    {childItems
                                        .filter(
                                            (childItem) => childItem.parent_id === parentItem.id
                                        )
                                        .map((childItem) => (
                                            <i
                                                key={childItem.id}
                                                style={{visibility: showTitle ? "visible" : "hidden"}}
                                                className="fa-solid fa-caret-down absolute right-3"
                                            ></i>
                                        ))}
                                </summary>

                                {childItems
                                    .filter((childItem) => childItem.parent_id === parentItem.id)
                                    .map((childItem) => (
                                        <Link
                                            // style={{ visibility: showTitle ? "visible" : "hidden" }}
                                            className={classNames(
                                                " flex items-center pl-3 py-1 rounded-lg hover:bg-base-300 text-base-content",
                                                {
                                                    active: router.pathname === childItem.link,
                                                    hidden: !showTitle,
                                                }
                                            )}
                                            href={childItem.link}
                                            key={childItem.id}
                                        >
                                            <i
                                                className={
                                                    childItem.icon +
                                                    "text-gray-500 ml-10  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                                }
                                            >
                                                {" "}
                                            </i>
                                            <span
                                                className={classNames(
                                                    "relative ml-5 whitespace-nowrap",
                                                    {
                                                        hidden: !showTitle,
                                                    }
                                                )}
                                            >
                        {" "}
                                                {childItem.title}
                      </span>
                                        </Link>
                                    ))}
                            </details>
                        ))}

                        <li className="mt-auto grid fixed bottom-4">
                            <label className="swap swap-rotate">
                                <input type="checkbox"/>
                                <svg onClick={fn_change_theme} className="swap-on fill-current w-7 h-7 mx-2" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 24 24">
                                    <path
                                        d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
                                </svg>
                                <svg onClick={fn_change_theme} className="swap-off fill-current w-7 h-7 mx-2" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 24 24">
                                    <path
                                        d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/>
                                </svg>
                            </label>
                        </li>
                    </ul>
                </div>
            </aside>

            <div
                className={classNames("p-4 min-h-screen transition-all", {
                    "sm:ml-64": contentMargin,
                    "ml-16": !contentMargin,
                    "!ml-0": sidebarToggle,
                })}
            >
                <div className="p-4 rounded-lg dark:border-gray-700 mt-14 mx-auto md:mx-24">
                    {children}
                </div>
            </div>
        </>
    );
}
