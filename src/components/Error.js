import Wrapper from "../assets/wrappers/ErrorPage"
import error_page from "../assets/images/404_not_found.svg"
import { Link } from "react-router-dom"

const Error = () => {
  return (
    <Wrapper className="full-page">
      <div className="container page">
        <img src={error_page} alt="404_not_found" className="img" />
        <h3>oh!! page not found!!</h3>
        <p>We can't seem to find what you are looking for.</p>
        <Link to="/">Back home</Link>
      </div>
    </Wrapper>
  )
}

export default Error;