export default function Avatar({imageURL, altContent, size, rounded}) {
    return (
        <div className="avatar">
            <div className={`w-${size} rounded-${rounded}`}>
                <img src={imageURL} alt={altContent}/>
            </div>
        </div>
    )
}