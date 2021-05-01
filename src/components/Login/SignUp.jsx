export default function SignUp(){
    return(
    <div className="signup-form">
    <h1>Create Account</h1>
    {/* <div >{error}</div> */}
    <label>First Name </label>
    <input type="text" required className="input-box"/>
    <label>Last Name </label>
    <input name="password" required className="input-box"/>
    <label>Email </label>
    <input type="text" name="email" required className="input-box"/>
    <label>Password </label>
    <input type="password" name="password" required className="input-box"/>       
    <button type="button" className="btn btn-large">Create</button>
    </div>
    )
}