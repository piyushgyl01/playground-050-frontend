import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function Home() {
  const { data, loading, error, refetch } = useFetch(
    `${import.meta.env.VITE_API_URL}/chars`
  );

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this char?")) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/chars/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          refetch();
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <main className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Chars List</h2>
        <Link to="/post" className="btn btn-success">
          Add New Char
        </Link>
      </div>

      {loading && (
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="d-flex justify-content-center align-items-center">
          <div className="alert alert-danger">{error}</div>
        </div>
      )}

      {data && data.length === 0 && (
        <div className="alert alert-info">
          No Chars found. Add your first char!
        </div>
      )}

      <div className="row">
        {data &&
          data.map((char) => (
            <div className="col-md-12 mb-4 list-group" key={char._id}>
              <div className="list-group-item list-group-item-action">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">
                    {char.charName} of {char.charSeries} by {char.charAuth}
                  </h5>
                  <small className="text-body-secondary">
                    {new Date(char.createdAt).toLocaleDateString()}
                  </small>
                </div>
                <Link
                  to={`/details/${char._id}`}
                  className="btn btn-primary me-2 mt-2"
                >
                  View Details
                </Link>
                <button
                  className="btn btn-danger mt-2"
                  onClick={() => handleDelete(char._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
