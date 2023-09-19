export default function Card({ cardTitle, children }) {
  return (
    <>
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{cardTitle}</h2>
          <p>{children}</p>
        </div>
      </div>
    </>
  );
}
