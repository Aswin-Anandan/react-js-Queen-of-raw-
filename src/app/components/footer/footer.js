import React from "react";
import './footer.css'
import logo2 from '../../../assets/pub/media/onboard/logo2.png'
import fb from '../../../assets/pub/media/onboard/fb.png'
import twitter from '../../../assets/pub/media/onboard/twitter.png'
import insta from '../../../assets/pub/media/onboard/insta.png'
import yt from '../../../assets/pub/media/onboard/yt.png'




class Footer extends React.Component {
  state = {
    open: true
  };

  componentDidMount() {
  }

  render() {
    const { classes } = this.props;


    return (
    <div className="footer">
        <div className="footer0">
            <div className="line1">
                <img src={logo2}></img>
                <div><p id="b-text">Subscribe our Newsletter</p>
                <div><input type="text" placeholder="Your email here"></input><button>Go Raw</button></div>
                </div>
                <div className="icons1">
                <img src={fb}/>
                <img src={insta}/> 
                <img src={twitter}/>
                <img src={yt}/>
                </div>
            </div>
            <div>
                <div  className="line2">
                <div className="abt-us"><p id="b-text">ABOUT US</p>
                <p id="n-text">
                Buy and sell your deadstock and sustainable fabrics online in our marketplace. <br /><br />

We have everything from organic cotton, peace silk, faux leather and fur, to some of the highest quality luxury deadstock fabrics that would otherwise be burned and buried if it wasn't for you.</p> </div>
                <div className="inner-grid">
                    <div className="rale"><p id="b-text">MY ACCOUNT</p>
                    My Account Log In<br />
                    My Orders
                    </div>
                    <div className="rale"><p id="b-text">CUSTOMER CARE</p>
                    Contact-Us<br />
                    Returns & Shipping<br />
                    Security Policy
                    </div>
                    <div className="rale" id="small-abt"><p id="b-text">ABOUT US</p>
                    The Company<br />
                    Privacy Policy <br />
                    Terms Of Service
                    </div>
                    <div className="rale"><p id="b-text">SUPPLIERS</p>
                    Apply To Sell<br />
                    How It Works <br />
                    Seller FAQs
                    <br />
                    Supplier Log In
                    </div>
                </div>
                </div>

            </div>
            <div id="bottom-footer">
            <span id="gapl">Copyright © 2014-19 Queen Of Raw, Inc. All Rights Reserved.</span><span id="gapr">New York City, New York&nbsp;&nbsp;&nbsp;&nbsp;646-583-0076</span>
       </div>
        </div>

       



    </div>
    );
  }
}
export default (Footer);
