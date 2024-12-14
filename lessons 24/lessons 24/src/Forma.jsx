export default function Forma() {
  
    return (
      
      <form className="input-group mb-3 js--swapi_form">
          <span className="input-group-text" id="basic-addon3">https://swapi.dev/api/</span>
          <input type="text" name="url" className="form-control js--swapi_input" id="basic-url" placeholder="people/1/" aria-describedby="basic-addon3"/>
          <button className="btn btn-outline-secondary" id="button-addon2">Get info</button>
      </form>
      
    )
  }