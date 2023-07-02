export default function Card({cardTitle, children}) {
    return (
        <>
            <div
                className="border-2 bg-card_bg_light dark:bg-card_bg_dark px-4 py-2 rounded-md">
                <h3 className="text-2xl border-b-2 pb-2 px-2 mb-2">{cardTitle}</h3>
                {children}
            </div>
        </>
    )
}