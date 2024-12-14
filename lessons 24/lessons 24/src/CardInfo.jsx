export default function CardInfo () {
    return (
        <div className="card">
        <div className="card-body">
            <div className="badge  bg-secondary js--swapi_controller">people</div>
            <div className="badge  ms-1 bg-secondary js--swapi_id">1</div>
            <div className="load  js--swapi_load">
                {/* <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div> */}
            </div>
            <pre className="mt-2 mb-0 js--swapi_pre"></pre>
        </div>
    </div>
    )
}
