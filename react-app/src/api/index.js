import axios from 'axios';

const URL = 'http://server.ditinex.online:9090'

const API = {

	listProducts: ()=>{
		return axios.get(URL+'/listproducts')
		.then(res => {
			return res.data;
		})
	},
	signup: (email,password)=>{
		return axios.post(URL+'/signup',{email: email,password: password})
		.then(res => {
			return res.data;
		})
	},
	login: (email,password)=>{
		return axios.post(URL+'/login',{email: email,password: password})
		.then(res => {
			return res.data;
		})
	},
	listSuggestions: (userId)=>{
		return axios.get(URL+'/listSuggestions/'+userId)
		.then(res => {
			return res.data;
		})
	}
}

export { API }