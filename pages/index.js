import getUserData from "@/utils/getUserData";

export default function home({username}) {
    return (
        <>
            {username}
        </>
    )
}

export async function getServerSideProps(context) {
    const userData = await getUserData(context.req);
    if (!userData) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    return {
        props: userData,
    };
}
