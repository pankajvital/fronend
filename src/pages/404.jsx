import { useEffect } from "react";
import { companyName } from "../components/Constants";
export const Notfound = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo(0, 0);
    }, ); // Adjust the delay as needed

    return () => clearTimeout(timeout); // Clear timeout on component unmount
  }, []); // This will run only once when the component mounts
  return (
    <>
    {/* <section id="common_banner" className='top-page'>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="common_bannner_text">
              <h2>404 Page Not Found</h2>
              <ul>
                <li>
                  <a href="index.html">Home</a>
                </li>
                <li>
                  <span>
                    <i className="fas fa-circle" />
                  </span>
                 404
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section> */}
      <div className="about-book-shadow container-fluid">
      <div className="sectionpage">
        <div>
        <h1 className="errorpage">404</h1>
        <div className="page">Ooops!!! The page you are looking for is not found</div>
        <a href="/" class="btn btn_theme-sec btn_md-sec" fdprocessedid="4ivfft">Go To Home</a>
        </div>

</div>
    </div>
    </>
  );
};

export default Notfound
