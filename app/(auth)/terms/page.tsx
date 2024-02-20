import React from "react";

type Props = {};

const Terms = (props: Props) => {
  return (
    <div className="px-5 my-5 flex flex-col gap-5">
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl text-[#333] font-bold">
          PlanetF Privacy Policy (Section 1)
        </h1>
        <p>
          PlanetF App is owned and operated by "PlanetF". PlanetF (which
          relatively means "we", "our", "us") hold our users in high esteem.
          Hence, the importance of creating and utilizing the Privacy Policy. It
          is essential in ensuring that users understand the rules, regulations
          and guidelines entailed in the use of the App.
        </p>
      </div>

      <div className="flex flex-col gap-5 ">
        <h1 className="text-2xl text-[#333] font-bold">
          IDEA OF THE PRIVACY POLICY
        </h1>
        <p>The Privacy Policy is being formulated to describe:</p>
        <ol className="list-decimal px-5">
          <li>The business and equally what we offer</li>
          <li>
            How to handle your profile and the implications of mishandling
          </li>
          <li>How we protect your personal details</li>
          <li>Your payment and purchasing information</li>
          <li>App Reliability</li>
          <li>Marketing, Communication, and Promotion</li>
          <li>Our information or transaction storage limit</li>
          <li>The Perpetrators of Illegal Activity</li>
          <li>Our API Documentation</li>
          <li>Modifications to the Privacy Policy</li>
        </ol>
      </div>

      <div className="flex flex-col gap-5">
        <h1 className="text-2xl text-[#333] font-bold">
          AGREEMENT TO TERMS OF USE
        </h1>
        <p>
          By accessing or using this App, you ("you" which relatively means the
          customer or user, and organization) that enters into these terms and
          conditions agree to be bound by the policies stated below ("Privacy
          Policy"). This App expressly incorporates the App guidelines, rules,
          notifications, or disclaimers that may be displayed, posted and
          updated on the App or on notices sent to you. If you do not agree with
          this policy, please do not use this App and do not proceed with any
          registration steps. By continuing to use the App, you agree to be
          bound by this privacy policy. PlanetF reserves the right to change,
          modify, add or remove portions of the privacy policy in its sole
          discretion at any time and without prior notice. Please check this
          page periodically for any modifications. Your continued use of this
          App following the posting of any changes will mean that you understood
          and accepted the changes.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <h1 className="text-2xl text-[#333] font-bold">WHAT WE OFFER</h1>
        <p>
          PlanetF is a modern data selling platform, giving customers or users a
          home inside of your home services and comfort with just your
          smartphones. We offer our customer’s a wide range of choices including
          airtime purchase, Cable TV subscription, electricity bill
          subscription, car purchase, airtime to cash conversion, and many more
          as your begin to explore. PlanetF is backed by local stakeholders as
          well as global leaders in consumer technology solutions.
        </p>
      </div>
    </div>
  );
};

export default Terms;
