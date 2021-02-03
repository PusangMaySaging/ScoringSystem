import loading from '../images/loading.svg'

function Loader(props) {
    //loading component
    //loading mark-up
    return (
      <div className={props.loadingState}>
          <div className="loader-container-wrapper">
            <img src={loading} height="250px" width="300px"></img>
          </div>
          
      </div>
    );
  }
  
  export default Loader;
  