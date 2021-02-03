function Header() {
    //header of webapp to be imported
    return (
      <header>
          <div className = "header-title"><h1>STI College Munoz - SportFest</h1></div>
          <div className = "full-navigation">
              <nav className="navigation">
                  <ul className="nav-links">
                      <li className="nav-link"><a href="#">Home</a></li>
                      <li className="nav-link"><a href="/Team">Teams</a></li>
                      <li className="nav-link"><a href="#">Profile</a></li>
                  </ul>
              </nav>
          </div>
      </header>
    );
  }
  
  export default Header;
  