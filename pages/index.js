import EmptyLayout from "@/layouts/EmptyLayout";
import CustomInput from "@/components/CustomInput/CustomInput";
import {useState} from "react";
import classNames from "classnames";

export default function Login() {

    const [showPassword, setShowPassword] = useState(true);

    return (
        <EmptyLayout>
            <div className="grid mt-12">
                <div className="m-auto border-2 px-16 pt-8 pb-20 rounded-lg shadow-primary_logo_dark/30 dark:shadow-primary_logo_dark/30 shadow-2xl">
                    <div className="mb-10 pb-10 border-b-2">
                        <img src="https://wxpbrdtmrnvqglioltbm.supabase.co/storage/v1/object/public/avalon/logo.png"
                             className="w-12 mx-auto" alt="logo"/>
                        <p className="mt-2">Avalon Management System</p>
                    </div>
                    <div className="my-6">
                        <CustomInput labelContent="Username" inputID="username" inputPlaceholder="Username"/>
                    </div>
                    <div className="my-6">
                        <div className="relative">
                            <CustomInput labelContent="Password" inputID="password" inputPlaceholder="Password"
                                         type={showPassword ? "password" : "text"}/>
                            <i className={
                                classNames("absolute top-[34px] right-2 cursor-pointer", {
                                    "fa-solid fa-eye": showPassword,
                                    "fa-solid fa-eye-slash": !showPassword
                                })
                            } onClick={() => setShowPassword(!showPassword)}></i>
                        </div>
                    </div>
                    <div className="my-2">
                        {/*<CustomInput  inputID="remember_me" type="checkbox"/>*/}
                        <input type="checkbox" id="remember_me" className="mr-3"/>
                        <label htmlFor="remember_me">Remember Me</label>
                    </div>
                    <div className="mt-8 grid mx-auto">
                        <button
                            className="border-2 p-2 rounded-lg hover:bg-primary_logo_light dark:hover:bg-primary_logo_dark transition-all duration-500">Sign
                            In
                        </button>
                    </div>
                </div>
            </div>
        </EmptyLayout>
    );
}
