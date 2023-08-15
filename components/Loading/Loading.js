export default function Loading() {
    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center overflow-hidden select-none">
                <div className="flex flex-col items-center animate-pulse">
                    <img src="https://wxpbrdtmrnvqglioltbm.supabase.co/storage/v1/object/public/avalon/logo.png"
                         alt="loading..." width="70"/>
                </div>
            </div>
        </>
    )
}