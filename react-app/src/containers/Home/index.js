import React, { Component } from 'react';
import { FaUserCircle, FaKey } from 'react-icons/fa';
import { connect } from 'react-redux';
import {
  Redirect
} from "react-router-dom";
import { userLogin, userLogout } from 'redux/action';
import 'assets/Theme.css';
import { Product } from 'components';
import { API } from 'api';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      suggestions: [],
      login_email: '',
      login_password: '',
      signup_email: '',
      signup_password: ''
    };
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){
    this.init()
  }

  componentDidUpdate() {
    if(this.props.type==="logout")
      this.logout();
  }

  /*========Logics========*/

  init = async () => {
    let data = await API.listProducts()
    let temp = []
    for(const [index, value] of data.entries()) {
      temp.push(<div key={index} className="col-md-3"><Product image={value.image} price={value.price} oldPrice={value.oldPrice} name={value.name} /></div>)
    }
    this.setState({products: temp});
  }

  getSuggestions = async () => {
    if(this.props.userSession.id){
      let data = await API.listSuggestions(this.props.userSession.id)
      let temp = []
      for(const [index, value] of data.entries()) {
        temp.push(<div key={index} className="col-md-3"><Product image={value.image} price={value.price} oldPrice={value.oldPrice} name={value.name} /></div>)
      }
      this.setState({suggestions: temp});
    }
  }

  login = async ()=>{
    let data = await API.login(this.state.login_email,this.state.login_password)
    if(data.output){
      this.props.dispatch(userLogin(data.output));
      this.getSuggestions()
    }
    else{
      alert(data.error)
    }
  }

  signup = async ()=>{
    let data = await API.signup(this.state.signup_email,this.state.signup_password)
    if(data.output){
      this.props.dispatch(userLogin(data.output));
      this.getSuggestions()
    }
    else{
      alert(data.error)
    }
  }

  logout = ()=>{
    this.setState({suggestions: []});
    this.props.dispatch(userLogout());
  }

  handleChange = (e)=>{
    let obj  = {}
    obj[e.target.id] = e.target.value
    this.setState(obj)
  }

  switchLayout = () => {
    if(this.props.type==='login')
      return this.render_login_whiteContainer();
    else if(this.props.type==='signup')
      return this.render_signup_whiteContainer();
    else
      return this.render_default_whiteContainer();
  }
  showProducts = () => {
    return (this.props.type===undefined || this.props.type==='dashboard') ? this.render_product_list() : null;
  }
  showSuggestions = () => {
    return (this.props.type==='dashboard' && this.state.suggestions.length > 0) ? this.render_suggestions_list() : null;
  }


/*========Layouts========*/

  render() {
    if(this.props.type==='logout' && this.props.userSession===null)
      return <Redirect to={{ pathname: "/" }} /> 
    else if(this.props.userSession===null && this.props.type==='dashboard')
      return <Redirect to={{ pathname: "/login" }} /> 
    else if(this.props.userSession!==null && this.props.type!=='dashboard' && this.props.type!=='logout')
      return <Redirect to={{ pathname: "/dashboard" }} /> 

    return (
      <div>
        <div className="white-container">
          {this.switchLayout()}
        </div>
        {this.showProducts()}
      </div>
    );
  }

  render_suggestions_list(){
    return(
      <div>
        <h1>Suggestions</h1>
        <div className="row">
        {this.state.suggestions}
        </div>
      </div>
    );
  }

  render_product_list(){
    return(
        <div className="white-bg">
            <div className="body-container">
                <h1>All Products</h1>
                <div className="row">
                  {this.state.products}
                </div>
                {this.showSuggestions()}
            </div>
        </div>
    );
  }

  render_default_whiteContainer(){
    return(
      <div>
        <h1>New Product Collection</h1>
        <h3>Sale 2020</h3>
      </div>
    );
  }

  render_login_whiteContainer(){
    return(
      <div>
        <h1>Login</h1>
        <form>
          <div className="input-wrapper">
            <div className="icon"><FaUserCircle /></div>
            <div><input id="login_email" onChange={this.handleChange} value={this.state.login_email} type="email" placeholder="Email" required /></div>
          </div>
          <div className="input-wrapper">
            <div className="icon"><FaKey /></div>
            <div><input id="login_password" onChange={this.handleChange} value={this.state.login_password} type="password" placeholder="password" required /></div>
          </div>
          <div className="btn-form" onClick={()=>this.login()}>Login</div>
        </form>
      </div>
    );
  }

  render_signup_whiteContainer(){
    return(
      <div>
        <h1>Signup</h1>
        <form>
          <div className="input-wrapper">
            <div className="icon"><FaUserCircle /></div>
            <div><input id="signup_email" onChange={this.handleChange} value={this.state.signup_email} type="email" placeholder="Email" required /></div>
          </div>
          <div className="input-wrapper">
            <div className="icon"><FaKey /></div>
            <div><input id="signup_password" onChange={this.handleChange} value={this.state.signup_password} type="password" placeholder="password" required /></div>
          </div>
          <div className="btn-form" onClick={()=>this.signup()}>Signup</div>
        </form>
      </div>
    );
  }


}

function mapStateToProps(state) {
  return {
    userSession: state.userSession
  };
}
const H = connect(mapStateToProps)(Home)


export { H as Home }
