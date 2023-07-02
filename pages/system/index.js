import Card from "@/components/Card/Card";
import {useEffect, useState} from "react";
import axios from "axios";
import Link from "next/link";
import classNames from "classnames";

export default function System() {
    const [sidebarData, setSidebarData] = useState([]);

    useEffect(() => {
        axios("/api/sidebar")
            .then(res => setSidebarData(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="grid">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <Card cardTitle="Modules">
                    <ul>
                        {sidebarData.map(item => (
                            <li key={item.id} className="border-b-2 py-3">
                                <i className={item.icon + " mr-3"}></i>
                                {item.title}
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>
        </div>
    )
}