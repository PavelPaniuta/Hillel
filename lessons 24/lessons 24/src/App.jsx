import './App.css'

function App() {
  
  return (
    <div className="container">
    <h1>SWAPI</h1>
    <form className="input-group mb-3 js--swapi_form">
        <span className="input-group-text" id="basic-addon3">https://swapi.dev/api/</span>
        <input type="text" name="url" className="form-control js--swapi_input" id="basic-url" placeholder="people/1/" aria-describedby="basic-addon3"/>
        <button className="btn btn-outline-secondary" id="button-addon2">Press me</button>
    </form>
    <div className="card">
        <div className="card-body">
            <span className="badge d-none bg-secondary js--swapi_controller">people</span>
            <span className="badge d-none bg-secondary js--swapi_id">1</span>
            <div className="load d-none js--swapi_load">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            <pre className="mt-2 mb-0 js--swapi_pre"></pre>
        </div>
    </div>
</div>
  )
}

export default App
