import Link from "next/link";

const PageNotFound = () => {
  return (
    <>
      <div className="mt-5 page_size">
        <div className="mt-5 text-white">
          <h2 className="mt-5">This page is not available</h2>
          <p className="text-center">Resource not found</p>
          <div className="text-center mt-5">
            <Link href="/">
              <button type="button" className="btn btn-primary">
                <i className="bi bi-house-fill"></i> Go Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
