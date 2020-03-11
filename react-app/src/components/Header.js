import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import 'assets/Theme.css';
import { MdMenu } from 'react-icons/md';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navbarClass: 'nav',
      menuClass: 'menu',
      menuOpen: false,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    this.setState({
      navbarClass: (window.scrollY > 0)? 'nav fixed-nav' : 'nav',
      menuClass: (window.scrollY > 0)? 'menu fixed-nav-menu' : 'menu',
    });
  }

  toggleMenu(){
    this.setState({
      menuOpen: !this.state.menuOpen,
    });
  }

  render() {
    const menuItems = (this.props.userSession == null)?[{ name: 'Home', url: '/' },{ name: 'Login', url: '/login' },{ name: 'Signup', url: '/signup' }] : [{ name: 'Dashboard', url: '/dashboard' },{ name: 'Logout', url: '/logout' }]
    const calc_h = ((menuItems.length*35)+10)+'px';
    const menuHeight = (this.state.menuOpen)? {height: calc_h} : {}

    return(
      <div className={this.state.navbarClass}>
        <h2 className="logo"><span>App-Test{}</span></h2> 
        <div className="toggle-nav" onClick={()=>this.toggleMenu()}><MdMenu size={32} /></div>

        <div className={this.state.menuClass}>
          <div className={(this.state.menuOpen)?'ul-container':'ul-container closed'} style={menuHeight} >
          <ul>
            {
              menuItems.map((item,i) => 
                <li key={i}><Link to={item.url}>{item.name}</Link></li>
              )
            }
          </ul>
          </div>

        </div>

      </div>
      );
  }
}

function mapStateToProps(state) {
  return {
    userSession: state.userSession
  };
}
const H = connect(mapStateToProps)(Header)
export { H as Header }
