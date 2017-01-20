import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {FormGroup, ControlLabel, HelpBlock, FormControl, Button} from 'react-bootstrap';
// import LoginInput from './LoginInput';

// <form onSubmit={handleSubmit} className="login-form">
//     <Field name="username" label="Username" component={LoginInput} type="text"/>
//     <Field name="password" label="Password" component={LoginInput} type="password"/>
//     <button type="submit" className="submit-button login-form_submit-button">Sign In</button>
// </form>
class LoginForm extends Component {
    // getInitialState() {
    //     return {
    //         username: ''
    //     };
    // };
    checkFieldOnValid(field){
        var currentCheckingField = this.loginFields[field];
        currentCheckingField.valid = currentCheckingField.data.test(this.state[field]);
        if (currentCheckingField.valid) {
            return 'success';
        }
        return 'error';
    }
    constructor(props) {
        super(props);
        this.loginFields = {
            username: {
                data: /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/,
                valid: false
            },
            password: {
                data: /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                valid: false
            }
        };
        this.state = {
            username: '',
            password: '',
            authentication:false,
            showLoginForm:false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeVisibilityLoginForm = this.changeVisibilityLoginForm.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        var that = this;
        let valid = true;
        Object.keys(this.loginFields).map(function(item,index){
            if(!that.loginFields[item].valid){
                valid = false;
            }
        });
        if(valid){
            that.setState({authentication: true});
            setTimeout(function(){
                that.setState({authentication: false});
            },4000);
        }else{
        }
    }
    changeVisibilityLoginForm(e){
        e.preventDefault();
        this.props.activeFormHandler('login');
        this.setState({showLoginForm:!this.state.showLoginForm});
    }
    render() {
        return (
            <form className={"login-form " + (this.state.authentication ? "authentication " : "") + (this.props.showingForm === 'login' ? "showed" : "")}  onSubmit={this.handleSubmit}>
                <div className="login-form_header" onClick={this.changeVisibilityLoginForm}>
                    <label>Вход</label>
                </div>
                <div className="login-form_content">
                    <FormGroup
                        controlId="authFormUsername"
                        validationState={this.checkFieldOnValid('username')}
                    >
                        <ControlLabel>Имя пользователя</ControlLabel>
                        <FormControl
                            type="text"
                            className="login-form-control"
                            value={this.state.username}
                            placeholder="Введите ваше имя пользователя..."
                            onChange={(e)=>{this.setState({username: e.target.value})}}
                        />
                        <FormControl.Feedback />
                        {/*<HelpBlock>Не меньше 5 символов, только латинские символы</HelpBlock>*/}
                    </FormGroup>
                    <FormGroup
                        controlId="authFormPassword"
                        validationState={this.checkFieldOnValid('password')}
                    >
                        <ControlLabel>Пароль</ControlLabel>
                        <FormControl
                            type="password"
                            className="login-form-control"
                            value={this.state.password}
                            placeholder="Введите ваш пароль..."
                            onChange={(e)=>{this.setState({password: e.target.value})}}
                        />
                        <FormControl.Feedback />
                        {/*<HelpBlock>Не меньше 5 символов, только латинские символы</HelpBlock>*/}
                    </FormGroup>
                    <Button className="login-form__submit" type="submit">
                        ВХОД
                    </Button>
                </div>
            </form>
        );
    }
}

LoginForm.contextTypes = {
    showingForm: React.PropTypes.string,
    activeFormHandler:React.PropTypes.func
};
// Decorate the form component
// LoginForm = reduxForm({
//     form: 'login' // a unique name for this form
// })(LoginForm);

export default LoginForm;