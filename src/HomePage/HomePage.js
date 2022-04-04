import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import $ from 'jquery';
import { userActions } from '../_actions';


class HomePage extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          picture: false,
          src: false
        }
      }
      handleChange(event){
        var picture = event.target.files[0];
        var src = URL.createObjectURL(picture);

        this.setState({
            picture:picture,
            src:src
        });
      }
      renderPreview() {
        if(this.state.src) {
          return (<img src={this.state.src}/>);
        } else {
          return (
            <div class="about-avatar">
                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" title="" alt=""/>
            </div>
          );
        }
      }
    
      upload() {
        var formData = new FormData();
    
        formData.append("file", this.state.picture);
    
        $.ajax({
          url: "/some/api/endpoint",
          method: "POST",
          data: formData,
          cache: false,
          contentType: false,
          processData: false,
          success: function(response) {
            
          }
        });
      }
    componentDidMount() {
        this.props.getUsers();
    }
    
    
    
    render() {
        const { user, users } = this.props;
        
       
        return (
            <div id="homediv">
                <section class="section about-section gray-bg" id="about">
                    <div class="container">
                        <div class="col-lg-6">
                            <div className="profile-pic">
                                
                                <label for="pic">Change Image</label>
                                <input type="file" id="pic" onChange={this.handleChange.bind(this)}/>
                                {this.renderPreview()}
                                
                                
                            </div>
                        </div>
                        <div class="row align-items-center flex-row-reverse">
                            <div class="col-lg-6">
                                <div class="about-text go-to">
                                    <h3 class="dark-color">I am {user.firstName + ' ' + user.lastName}</h3>
                                    <h6 class="theme-color lead">A  Website designer based in India</h6>
                                    <p>I am <mark>REACT JS Developer</mark> services for customers of all sizes, specializing in creating stylish, modern websites, web services and online stores. My passion is to design digital user experiences through the bold interface and meaningful interactions.</p>
                                    <div class="row about-list">
                                        <div class="col-md-6">
                                            <div class="media">
                                                <label>FIRST NAME :</label>
                                                <p>{user.firstName}</p>
                                            </div>
                                            <div class="media">
                                                <label>LAST NAME :</label>
                                                <p>{user.lastName}</p>
                                            </div>
                                            <div class="media">
                                                <label>EMAIL ID :</label>
                                                <p>{user.email}</p>
                                            </div>
                                            <div class="media">
                                                <label>PHONE :</label>
                                                <p>{user.phone}</p>
                                            </div>
                                        </div>
                                        
                                       
                                    </div>
                                    <button id="logout"><Link to="/login" >LogOut</Link></button>
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>
                </section>
            </div>
            
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}
function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };