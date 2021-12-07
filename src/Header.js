import React from 'react'

function Header(props) {
  const ddd = window.location.href; 
  console.log(ddd); 


if (ddd=="http://localhost:3000/home"){
    return (
        <div>
          
            
          
            <nav class="navbar fixed-top navbar-light bg-primary">
        <div className="container-fluid">
          <h6 className="navbar-brand  justify-content-center text-uppercase align-content-center">vbook</h6>
          <form className="d-flex">
             <button className="btn btn-outline-danger text-black bg-success" onClick={props.profile} type="submit">PROFILE</button>

             <button className="btn btn-outline-danger text-black bg-danger" onClick={props.logout} type="submit">LOGOUT</button>
          </form>
        </div>
      </nav>
        </div>
    )}

    else if(ddd=="http://localhost:3000/profile") {
      return(


        <div>
            <nav class="navbar fixed-top navbar-light bg-primary">
        <div className="container-fluid">
        <h6 className="navbar-brand  justify-content-center text-uppercase align-content-center">vbook</h6>

          <form className="d-flex">
             <button className="btn btn-outline-danger text-black bg-success" onClick={props.edit} type="submit">EDIT</button>

             <button className="btn btn-outline-danger text-black bg-danger" onClick={props.home} type="submit">HOME</button>
             <button className="btn btn-outline-danger text-black bg-danger" onClick={props.logout} type="submit">LOGOUT</button>
        
          </form>
        </div>
      </nav>
        </div>


      )
    }
    else{
      return (
        <div>
            <nav class="navbar fixed-top navbar-light bg-primary">
        <div className="container-fluid">
        <h6 className="navbar-brand  justify-content-center text-uppercase align-content-center">vbook</h6>

          <form className="d-flex">
             <button className="btn btn-outline-danger text-black bg-success" onClick={props.home} type="submit">HOME</button>

             <button className="btn btn-outline-danger text-black bg-danger" onClick={props.logout} type="submit">LOGOUT</button>
          </form>
        </div>
      </nav>
        </div>
    )

    }
}

export default Header
