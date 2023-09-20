export default function Card({cardTitle, children, type, imageURL}) {

    switch (type) {
        case "withImage":
            return (
                <div className="card w-96 bg-base-100 shadow-xl image-full">
                    <figure><img src={imageURL} alt=""/></figure>
                    <div className="card-body">
                        <h2 className="card-title">{cardTitle}</h2>
                        <p>{children}</p>
                    </div>
                </div>
            )
            break;
        default:
            return (
                <div className="card w-full bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">{cardTitle}</h2>
                        <p>{children}</p>
                    </div>
                </div>
            )
            break;
    }

}
