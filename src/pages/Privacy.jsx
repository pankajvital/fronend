import { useEffect } from "react";
import { companyName, email } from "../components/Constants";
export const Privacy = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo(0, 0);
    }, ); // Adjust the delay as needed

    return () => clearTimeout(timeout); // Clear timeout on component unmount
  }, []); // This will run only once when the component mounts
  return (
    <>
   <div className="banner-wrap">
        <img src="images/privacy-policy.jpg" className="img-fluid" alt="Privacy Policy" />
      </div>
      <div className="about-book-shadow container-fluid p-tag-justify">
      <div className="content-secttion-in">
      {/* <div class="content-secttion-in text-center">
            <span className="all-page-title">PRIVACY POLICY</span>
          </div> */}
        <span className="border">
          {/* <h2 className="mb-3">PRIVACY POLICY</h2> */}
          <p>
          A privacy policy is the section that describes how you are secure with {companyName} and its services. This privacy policy makes you aware of how {companyName} helps you in making reservations by using your personal details. This section also explains what information we collect and how we use it. Before proceeding, you might be interested to know how {companyName} works for you. Here is what you are going to enjoy:
          </p>
          <p>
          If you submit any Personal Information relating to other people to us or to our service providers in connection with the Services, you represent that you have the authority to do so and to permit us to use the information in obeying these policies.

          </p>
          <p>
            <strong style={{ color: "#696969" }}>
            How We May Collect Personal Information
            </strong>
          </p>
          <p>
          We and our service providers may collect Personal Information in a variety of ways, including:
          </p>
          <h3>YOUR DETAILS ARE SAFE</h3>
          <p>
          We make sure all the details you provide are safe with us, as customers’ satisfaction is our top priority.
          </p>
          <h3>YOU CAN MANAGE YOUR ACCOUNT</h3>
          <p>
          We give you all the rights to manage your account in a secure manner. You can make changes to your profile and use it according to your travel needs.

          </p>
          <h3>YOU GET 24 HOURS SUPPORT FROM EXPERTS</h3>
          <p>
          Our experts are available on call 24/7. You can contact them at {companyName} to get your issues resolved in a few minutes.
          </p>
          <h3>ZERO UNCERTAINTIES</h3>
          <p>
            We make sure no uncertainties can bother you. We describe each
            everything in this policy to make you feel secure with {companyName}.
          </p>
          <h3><span style={{textTransform:'uppercase'}}>{companyName}</span> PRIVACY POLICY</h3>
          <p>
            The aim behind providing the privacy policy here is to make you
            aware of how we collect your data and why we use it. This policy
            also describes who can use your details. We also recommend you to
            read the policies carefully before you use the website. Stay updated
            about the information provided in this section, as we can make
            amendments to this policy without any prior notice.
          </p>
          <h3>WHAT DATA DO WE COLLECT?</h3>
          <p>
            Every person, who uses our website and its services, needs to
            provide accurate and relevant details required to make reservations.
            However, we collect the only information we need to make bookings
            you request for.
          </p>
          <h3>WHY AND HOW WE USE YOUR PERSONAL DATA</h3>
          <p>
            We always seek for your permission before using your data. We use
            this information only for the services you have requested for. We
            use your information only if it is required to comply with legal
            obligations and rights. PLEASE NOTE the information may also be used
            normally for the business purpose described in this policy.
          </p>
          <h3>HOW LONG DO WE STORE YOUR DETAILS</h3>
          <h3>ZUSTRAVEL PRIVACY POLICY</h3>
          <p>
          We store your details as long as we need them for reservations or legal purposes. Please note that we keep the information anonymized or delete it once the reservation is confirmed. We use your information for the purpose you provide it for. You have all the rights to ask us to remove your information from our database at any {companyName}.com
          </p>
          <h3>WHEN WE SHARE YOUR DATA WITH THIRD PARTY</h3>
          <p>
            We do not share your information without your permission whether it
            is for the service you have requested for or we want to use it for
            legal purposes. The suppliers whose services you use through our
            website can collect your data with their own policies. Some {companyName}
            your data will be collected by the third parties that advertise on
            our website. Apart from this, the companies that help us to fulfill
            your requests will collect and use your details.
          </p>
          <h3>HOW WE KEEP YOUR DETAILS SAFE</h3>
          <p>
            {companyName} ensures all your needs are met in a secure manner.
            That&rsquo;s why we use the best possible and effective methods to
            keep your details safe, as keeping your details secure is our prime
            concern.
          </p>
          <h3>WHERE YOUR DETAILS WILL BE STORED</h3>
          <p>
            Your information will be stored in our database. We strive to
            provide better services depending on the location from where you are
            accessing our website. That&rsquo;s why we store your details in our
            database in order to enhance our services according to your
            expectations.
          </p>
          <h3>DOES <span style={{textTransform:'uppercase'}}>{companyName}</span> USE COOKIES?</h3>
          <p>
            Yes, {companyName} uses cookies and similar technologies to serve your
            purposes without any hurdle. We aim to deliver personalized and
            optimized services that meet your travel needs.
          </p>
          <h3>YOUR RIGHTS AND CHOICES</h3>
          <p>
            If you have an account with {companyName}, you reserve rights to access,
            edit, delete and download your personal data that is associated with
            your profile at any {companyName}. You can contact the experts at
            {companyName} at any {companyName} and get your queries resolved at any
            {companyName}. You can contact us through our toll-free number and send
            an email at {email}.
          </p>
        </span>
      </div>
    </div>
    </>
  );
};

export default Privacy;
