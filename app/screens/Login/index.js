import React, {Component} from 'react';
import './assets/style.css';
import {browserHistory} from 'react-router';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
export default class Login extends Component {
    constructor(props) {
        super();
        this.state={
            activeForm: 'login'
        };
        console.log("где конструктор логина блеать");
        // var auth = false;
        // if(!auth){
        //     console.log("LOOOL SUKA");
        //     browserHistory.push({pathname: '/login'});
        // }
    };
    componentDidMount = () => {
        document.title = "ВХОД | PROJECT CASINO";
    };
    changeActiveForm = (form) => {
        // Do something with the form values
        this.setState({activeForm:form});
    };
    // getInitialState(){
    //     return {
    //         authData:{
    //             username: 'suckmydick',
    //             password: ''
    //         }
    //     }
    // }
    // handleSubmit = (e) => {
    //     debugger;
    //     e.preventDefault();
    //     var asdasdas = this.props;
    //     // this check user
    //     // console.log(this._input);
    //     this.context.router.push({pathname: `/`});
    // };
    
    render() {
        // function sucker(){
        //     debugger;
        //     var thatState = this.state;
        //     var thatProps = this.props;
        //
        // }
        // sucker();
        return (
                    <div className="login-container" >
                        <div className="login-container_logo">
                            <label>project casino</label>
                        </div>
                        <LoginForm showingForm={this.state.activeForm} activeFormHandler={this.changeActiveForm}/>
                        <RegistrationForm showingForm={this.state.activeForm} activeFormHandler={this.changeActiveForm}/>
                    </div>

        );
    }
}

Login.contextTypes = {
    router: React.PropTypes.object.isRequired,
};
