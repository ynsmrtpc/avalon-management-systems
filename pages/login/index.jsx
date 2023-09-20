import EmptyLayout from "@/layouts/EmptyLayout";
import CustomInput from "@/components/CustomInput/CustomInput";
import {useState} from "react";
import classNames from "classnames";
import axios from "axios";
import Alert from "@/components/Alert/Alert";
import {useRouter} from "next/router";
import Head from "next/head";
import Card from "@/components/Card/Card";

export default function Login() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(true);
    const [loading, setLoading] = useState(false);
    const [loginResult, setLoginResult] = useState({});
    const [loginData, setLoginData] = useState({username: "", password: ""});

    async function handleSubmit() {
        setLoginResult({});
        setLoading(true);
        const formData = new FormData();
        formData.append("username", loginData.username);
        formData.append("password", loginData.password);

        const username_regex = /^[a-z0-9_-]{3,15}$/;
        const password_regex =
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        let ready = 0;
        if (
            !username_regex.test(loginData.username) ||
            !password_regex.test(loginData.password)
        ) {
            setLoginResult({
                error: 1,
                message: `Gerersiz kullanıcı adı veya parola. Lütfen ilgili alanları kontrol ediniz.. `,
            });
            setLoading(false);
            ready = 1;
        }

        if (ready === 0) {
            const result = await axios
                .post("/api/login", formData, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .finally(() => {
                    setLoading(false);
                    router.push("/profile");
                });
            await setLoginResult(result.data);
        }
    }

    return (
        <EmptyLayout>
            <Head>
                <title>Avalon | Login</title>
            </Head>

            <div className="grid grid-cols-12 h-screen">
                <div className="col-span-12 m-auto">
                    <Card cardTitle="Avalon Management System">
                        <img
                            src="https://wxpbrdtmrnvqglioltbm.supabase.co/storage/v1/object/public/avalon/logo.png"
                            className={classNames("w-14 mx-auto", {
                                "animate-spin": loading,
                            })}
                            alt="logo"
                        />
                        <div className="mt-3">
                            <CustomInput
                                handleSubmit={(event) =>
                                    event.key === "Enter" ? handleSubmit() : null
                                }
                                labelContent="Username"
                                inputID="username"
                                inputPlaceholder="Username"
                                onInputChange={(e) =>
                                    setLoginData((prevState) => ({
                                        ...prevState,
                                        username: e.target.value,
                                    }))
                                }
                            />
                        </div>

                        <div className="relative">
                            <CustomInput
                                handleSubmit={(event) =>
                                    event.key === "Enter" ? handleSubmit() : null
                                }
                                labelContent="Password"
                                inputID="password"
                                inputPlaceholder="Password"
                                type={showPassword ? "password" : "text"}
                                onInputChange={(e) =>
                                    setLoginData((prevState) => ({
                                        ...prevState,
                                        password: e.target.value,
                                    }))
                                }
                            />
                            <i
                                className={classNames(
                                    "absolute top-[3.2rem] right-4 cursor-pointer",
                                    {
                                        "fa-solid fa-eye": showPassword,
                                        "fa-solid fa-eye-slash": !showPassword,
                                    }
                                )}
                                onClick={() => setShowPassword(!showPassword)}
                            ></i>
                        </div>

                        <CustomInput
                            type="checkbox"
                            className="checkbox"
                            labelContent="Remember Me"
                        />

                        {loginResult && (
                            <div className="my-4">
                                <Alert error={loginResult.error} message={loginResult.message}/>
                            </div>
                        )}

                        <button
                            onClick={handleSubmit}
                            className="btn btn-wide btn-neutral disabled:bg-zinc-400 disabled:cursor-not-allowed"
                            disabled={loading ?? true}
                        >
                            Giriş Yap
                        </button>
                    </Card>
                </div>
            </div>
        </EmptyLayout>
    );
}
