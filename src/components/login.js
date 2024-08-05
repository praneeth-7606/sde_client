// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import axios from "axios";
import {toast} from "react-toastify"
import Layout from "./layout/layout";
import { useAuth } from "./context/auth";
function Login() {
    // const [data, setData] = useState({ email: "", password: "" });
    const [auth,setauth]=useAuth()
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // const handleChange = (e) => {
    //     setData({ ...data, [e.target.name]: e.target.value });
    //     setError(null); 
    // };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        const res=await axios.post(
          `https://sde-server.onrender.com/api/route/auth/login`,{email,password});
        if(res.data.success){
          toast.success(res.data.message);
          setauth({
            ...auth,
            user:res.data.user,
            token:res.data.token,

          })
          localStorage.setItem("auth",JSON.stringify(res.data))
          navigate("/mainpage")
        }else{
          toast.error(res.data.message)
        }
      

      }
      catch(error){
        console.log(error)
        toast.error("something went wrong")

      }
    };
    console.log("https://sde-server.onrender.com/api/route/auth/login")

    const handleRecaptchaChange = () => {
        setVerified(true);
    };

    return (
      <Layout title="loginform" >
        <div className="container-fluid">
            <div className="row justify-content-center align-items-center" style={{ minHeight: "5vh" }}>
                <div className="col-md-3  pb-5 ">
                    <Card className="pl-2 mt-4">
                        <Card.Body>
                            <h1 className="text-center mb-4"> Login Form</h1>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <div className="input-group">
                                        <span className="input-group-text"><EmailIcon/></span>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter email"
                                            name="email"
                                            value={email}
                                            onChange={(e)=>setemail(e.target.value)}
                                        />
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <div className="input-group">
                                        <span className="input-group-text"><KeyIcon/></span>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            value={password}
                                            onChange={(e)=>setpassword(e.target.value)}
                                        />
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Remember me" />
                                </Form.Group>

                                <Form.Group   className="mb-3 " controlId="formBasicRecaptcha">
                                    <ReCAPTCHA 
                                        sitekey="6LeiCHYpAAAAAHYT5MvUTWtsr8bno4uegMXsu9Um"
                                        onChange={handleRecaptchaChange}
                                    />
                                </Form.Group>

                                
                                
                                <Button
                                    variant="primary"
                                    type="submit"
                                    onClick={()=>{navigate("/forgot")}}
                                    className="btn btn-primary  w-100"
                                    // style={{width:"10%"}}
                                >
                                    Forgot password
                                </Button>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="btn btn-success mt-3 w-100"
                                    disabled={!verified}
                                >
                                    Login
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
        </Layout>
    );
}

export default Login;
