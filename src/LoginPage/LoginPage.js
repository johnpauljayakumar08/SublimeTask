import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SocialMediaIconsReact } from 'social-media-icons-react';
import { userActions } from '../_actions';
import '../App.css';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.logout();

        this.state = {
            email: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password } = this.state;
        if (email && password) {
            this.props.login(email, password);
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { email, password, submitted } = this.state;
        return (
            <div id="loginmain">
                <div id="wrapper">
                    
                    <div id="form-inner">
                        <form name="form" onSubmit={this.handleSubmit}>
                            <div id="form-header">
                                <h3>Login IN</h3>
                               
                            </div>
                            <div id={'form-group' + (submitted && !email ? ' has-error' : '')}>
                                <label for="">Email:</label>
                                <i class="fa fa-envelope icon"></i>
                                <input type="text" className="form-control" placeholder='Enter your Email ID' name="email" value={email} onChange={this.handleChange} />
                                {submitted && !email &&
                                    <div className="help-block">email is required</div>
                                }
                            </div>
                            <div id={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                <label for="">Password:</label>
                                <i class="fa fa-lock icon"></i>
                                <input type="password" className="form-control" placeholder='Enter your password' name="password" value={password} onChange={this.handleChange} />
                                {submitted && !password &&
                                    <div className="help-block">password is required</div>
                                }
                            </div>
                            <button>Login</button>
                            <Link to="/register" id="btn">New User? Signup</Link>
                            <div id="socials">
                                <p> Login with social platforms</p>
                                <a href="" id="socials-icon">
                                    <SocialMediaIconsReact borderColor="rgba(246,128,128,0.25)" borderWidth="5" borderStyle="solid" icon="facebook" iconColor="rgba(82,118,246,1)" backgroundColor="rgba(243,239,241,1)" iconSize="5" roundness="50%" url="https://some-website.com/my-social-media-url" size="40" />
                                </a>
                                <a href="" id="socials-icon">
                                    <SocialMediaIconsReact borderColor="rgba(242,11,11,0.25)" borderWidth="5" borderStyle="solid" icon="googleplus" iconColor="rgba(253,5,5,1)" backgroundColor="rgba(243,239,241,1)" iconSize="5" roundness="50%" url="https://some-website.com/my-social-media-url" size="40" />
                                </a>
                                <a href="" id="socials-icon">
                                    <SocialMediaIconsReact borderColor="rgba(246,128,128,0.25)" borderWidth="5" borderStyle="solid" icon="twitter" iconColor="rgba(59,172,240,1)" backgroundColor="rgba(243,239,241,1)" iconSize="5" roundness="50%" url="https://some-website.com/my-social-media-url" size="40" />
                                </a>
                                
                            </div>
                        </form>
                    </div>
                    <div id="image-holder1">
                        <img src="images/Tablet login-bro.png" alt=""/>
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };