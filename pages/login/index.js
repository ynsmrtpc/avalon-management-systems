import EmptyLayout from "@/layouts/EmptyLayout";
import CustomInput from "@/components/CustomInput/CustomInput";
import {useState} from "react";
import classNames from "classnames";
import axios from "axios";
import Alert from "@/components/Alert/Alert";
import {useRouter} from "next/router";

export default function Login() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(true);
    const [loading, setLoading] = useState(false);
    const [loginResult, setLoginResult] = useState({});
    const [loginData, setLoginData] = useState({username: "", password: ""});

    async function handleSubmit() {
        setLoading(true);
        const formData = new FormData();
        formData.append("username", loginData.username);
        formData.append("password", loginData.password);

        const result = await axios
            .post("/api/login", formData, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .finally(() => {
                setLoading(false);
                router.push('/profile')
            })
        await setLoginResult(result.data)
    }

    return (
        <EmptyLayout>
            <div className="grid mt-12">
                <div
                    className="m-auto border-2 px-16 pt-8 pb-20 rounded-lg shadow-primary_logo_dark/30 dark:shadow-primary_logo_dark/30 shadow-2xl">
                    <div className="mb-10 pb-10 border-b-2 ">
                        <img src="https://wxpbrdtmrnvqglioltbm.supabase.co/storage/v1/object/public/avalon/logo.png"
                             className={classNames("w-12 mx-auto", {
                                 "animate-spin": loading
                             })} alt="logo"/>
                        <p className="mt-2">Avalon Management System</p>
                    </div>
                    <div className="my-6">
                        <CustomInput
                            labelContent="Username"
                            inputID="username"
                            inputPlaceholder="Username"
                            onInputChange={(e) => setLoginData(prevState => ({
                                ...prevState,
                                username: e.target.value
                            }))}
                        />
                    </div>
                    <div className="my-6">
                        <div className="relative">
                            <CustomInput
                                className="pr-8"
                                labelContent="Password"
                                inputID="password"
                                inputPlaceholder="Password"
                                type={showPassword ? "password" : "text"}
                                onInputChange={(e) => setLoginData(prevState => ({
                                    ...prevState,
                                    password: e.target.value
                                }))}
                            />
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

                    {loginResult && (

                        <div className="my-4">
                            <Alert error={loginResult.error} message={loginResult.message}/>
                        </div>
                    )}

                    <div className="mt-6 grid mx-auto">
                        <button
                            onClick={handleSubmit}
                            className="border-2 p-2 rounded-lg hover:bg-primary_logo_light dark:hover:bg-primary_logo_dark transition-all duration-500 disabled:bg-zinc-400 disabled:cursor-not-allowed"
                            disabled={loading ?? true}
                        >
                            Giriş Yap
                        </button>
                    </div>
                </div>
            </div>
        </EmptyLayout>
    );
}
