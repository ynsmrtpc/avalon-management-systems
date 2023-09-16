import React, {useEffect, useState} from "react";
import Link from "next/link";
import {fn_make_label} from "@/utils/functions";

export default function BreadCrumb({path}) {
    const [breadcrumbs, setBreadcrumbs] = useState([]);

    // Path'i parçalayarak breadcrumb öğelerini oluştur
    const generateBreadcrumbs = (path) => {
        const parts = path.split("/").filter((part) => part !== "");
        const breadcrumbs = parts.map((part, index) => ({
            name: part,
            isLast: index === parts.length - 1,
        }));
        setBreadcrumbs(breadcrumbs);
    };

    useEffect(() => {
        generateBreadcrumbs(path);
    }, [path]);

    return (
        <nav
            className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
            aria-label="Breadcrumb"
        >
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                    <Link href="/"
                          className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                        <svg
                            className="w-3 h-3 mr-2.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                d="M19.707 9.293l-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                        </svg>
                        Ana Sayfa
                    </Link>
                </li>

                {breadcrumbs.map((breadcrumb, index) => (
                    <li key={index}>
                        <div className="flex items-center">
                            <svg
                                className={`w-3 h-3 mx-1 text-gray-400 ${
                                    breadcrumb.isLast ? "" : ""
                                }`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 9l4-4-4-4"
                                />
                            </svg>
                            {breadcrumb.isLast ? (
                                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                  {fn_make_label(breadcrumb.name)}
                </span>
                            ) : (
                                <Link href={`/${breadcrumb.name}`}
                                      className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                                    {fn_make_label(breadcrumb.name)}
                                </Link>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
