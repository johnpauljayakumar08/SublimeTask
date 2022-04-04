import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {SocialMediaIconsReact} from 'social-media-icons-react';
import { userActions } from '../_actions';
import { UserOutlined,MailOutlined,PhoneOutlined,LockOutlined} from '@ant-design/icons';
import  '../App.css';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                email: '',
                phone:'',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.firstName && user.lastName  && user.email  && user.phone  && user.password) {
            this.props.register(user);
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return (
            <div id="main">
                
                <div id="wrapper">
                    <div id="image-holder">
                        <img src="images/Sign up-amico.png" alt=""/>
                    </div>
                    <div id="form-inner">
                        <form name="form" onSubmit={this.handleSubmit}>
                            <div id="form-header">
                                <h3>Sign up</h3>
                                <img src="images/sign-up.png" alt="" id="sign-up-icon"/>
                            </div>
                            <div id={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                                <label for="">First Name:</label>
                                <i class="fa fa-user icon"></i>
                                <input type="text" className="form-control" placeholder='Enter your First Name' prefix={<UserOutlined />} name="firstName" value={user.firstName} onChange={this.handleChange} />
                                {submitted && !user.firstName &&
                                    <span className="help-block">First Name is required</span>
                                }
                            </div>
                            <div id={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                                <label for="">Last Name:</label>
                                <i class="fa fa-user icon"></i>
                                <input type="text" className="form-control" placeholder='Enter your Last Name' name="lastName" value={user.lastName} onChange={this.handleChange} />
                                {submitted && !user.lastName &&
                                    <span className="help-block">Last Name is required</span>
                                }
                            </div>
                            <div id={'form-group' + (submitted && !user.email && !regEmail.test(user.email) ? ' has-error' : '')}>
                                <label for="">Email:</label>
                                <i class="fa fa-envelope icon"></i>
                                <input type="text" className="form-control" placeholder='Enter your Email ID' name="email" value={user.email} onChange={this.handleChange} />
                                {submitted && !user.email &&
                                    <span className="help-block">Email ID is required</span>
                                }
                                {submitted && !regEmail.test(user.email)  &&
                                    <span className="help-block">Email ID is Invaild</span>
                                }
                            </div>
                            <div id={'form-group' + (submitted && !user.phone ? ' has-error' : '')}>
                                <label for="">Phone:</label>
                                <i class="fa fa-phone icon"></i>
                                <input type="text" className="form-control" placeholder='Enter your Phone Number' name="phone" value={user.phone} onChange={this.handleChange} />
                                {submitted && !user.phone &&
                                    <span className="help-block">Phone Number is required</span>
                                }
                            </div>
                            <div id={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                                <label for="">Password:</label>
                                <i class="fa fa-lock icon"></i>
                                <input type="password" className="form-control" placeholder='Enter your password' name="password" value={user.password} onChange={this.handleChange} />
                                {submitted && !user.password &&
                                    <span className="help-block">Password is required</span>
                                }
                            </div>
                            
                            <button>signup</button>
                            <Link to="/login" id="btn">Alread a User</Link>
                            <div id="socials">
                                <p>Sign up with social platforms</p>
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
                </div>
            </div>
            
			
		
            
        );
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };