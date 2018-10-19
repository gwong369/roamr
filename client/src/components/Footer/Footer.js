import React from "react";
import "./Footer.css";
import { SocialIcon } from 'react-social-icons';

const Footer = () => (
  <footer className="footer">
  <SocialIcon url="http://twitter.com" />
  <SocialIcon url="http://facebook.com" />
  <SocialIcon url="http://instagram.com" />
    {/* <span>ROAMR 2018</span> */}
  </footer>
);

export default Footer;


// var React  = require('react');
// var Router = require('react-router');
// var Link = Router.Link;
// var Navigation = require('react-router').Navigation;


// var Footer = React.createClass({

//   mixins: [Navigation],

//   render: function () {

//     return (
//     <footer>
//       <div id="credits">
//         <div className="container text-center">
//           <div className="row">
//             <div className="col-md-5">
//               <li>&copy; 2015</li>
//               <li><Link to="contactus">Contact Us</Link></li>
//               <li><Link to="about">About</Link></li>
//             </div>
//             <div className="col-md-5" id="social-networks">
//               <a href="#"><i className="fa fa-2x fa-facebook-square"></i></a>
//               <a href="#"><i className="fa fa-2x fa-twitter-square"></i></a>
//               <a href="#"><i className="fa fa-2x fa-google-plus-square"></i></a>
//               <a href="#"><i className="fa fa-2x fa-youtube-square"></i></a>
//               <a href="#"><i className="fa fa-2x fa-vimeo-square"></i></a>
//               <a href="#"><i className="fa fa-2x fa-pinterest-square"></i></a>
//               <a href="#"><i className="fa fa-2x fa-linkedin-square"></i></a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//       );
//     }
//   });

// module.exports = Footer;