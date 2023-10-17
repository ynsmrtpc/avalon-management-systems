export default function Avatar({
  imageURL,
  altContent,
  size,
  rounded,
  className,
}) {
  switch (size) {
    case "lg":
      return (
        <div className={`avatar ${className ? className : ""}`}>
          <div className={`w-32 rounded-${rounded}`}>
            <img src={imageURL} alt={altContent} />
          </div>
        </div>
      );
      break;
    case "md":
      return (
        <div className={`avatar ${className ? className : ""}`}>
          <div className={`w-20 rounded-${rounded}`}>
            <img src={imageURL} alt={altContent} />
          </div>
        </div>
      );
      break;
    case "sm":
      return (
        <div className={`avatar ${className ? className : ""}`}>
          <div className={`w-16 rounded-${rounded}`}>
            <img src={imageURL} alt={altContent} />
          </div>
        </div>
      );
      break;
    case "xs":
      return (
        <div className={`avatar ${className ? className : ""}`}>
          <div className={`w-8 rounded-${rounded}`}>
            <img src={imageURL} alt={altContent} />
          </div>
        </div>
      );
      break;
  }
}
