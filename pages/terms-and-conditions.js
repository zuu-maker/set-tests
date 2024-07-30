import React from "react";
import Banner from "@/components/Banner";
import Header from "@/components/Header";
import Head from "next/head";

const termsConditions = () => {
  return (
    <div>
      <Head>
        <title>Terms and Conditions </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner show={true} />
      <div className="container mx-auto">
        <div className="h-8"></div>
        <Header />
        <div className="py-5">
          <div className="flex flex-col items-center  justify-center w-full">
            <div className="w-5/6 sm:w-3/5 mt-5">
              <h2 className="text-2xl font-semibold text-gray-500">
                Terms & Conditions{" "}
              </h2>
              <div className=" shadow-xl opacity-80 p-5 sm:p-10 bg-cyan-400  brightness-105 ">
                <p className="text-gray-600  text-md font-sans">
                  Effective Date: December 15th, 2022 PLEASE READ THESE TERMS
                  AND CONDITIONS (TERMS) BEFORE USING THE SERVICES (AS DEFINED
                  BELOW). THEY ARE THE RULES AND REQUIREMENTS THAT APPLY TO THE
                  SERVICES. DO NOT PURCHASE A SUBSCRIPTION, REGISTER FOR AN
                  ACCOUNT (AS DEFINED BELOW), OR USE THE SERVICES IF YOU ARE NOT
                  IN AGREEMENT WITH THESE TERMS
                </p>
                <br />
                <p className="text-gray-600  text-md font-sans">
                  1.Preamble Welcome to SET online school, which is owned and
                  operated by Sirius Educational Trust (we, our, us or the
                  Company). By purchasing a subscription, registering an
                  account, or using our services, including all of the services
                  provided therein, and any other websites, applications, and
                  online services that link too these Terms (collectively, the
                  Services), you acknowledge that you have read and understand
                  these Terms and agree to be bound by them. In these Terms, you
                  refers to Adult Users (as defined below) of the Services and
                  purchasers of Accounts (as defined below). An adult is a
                  person of legal age who can enter into a contract; by
                  purchasing a subscription, registering for, or using the
                  Services, you represent and warrant that you are an adult and
                  that you will be responsible for ensuring that any child
                  authorized by you to use and access the Services does so in
                  accordance with these Terms.
                </p>
                <br />
                <p className="text-gray-600  text-md font-sans">
                  2.Account Users Users of the Services include Child Users
                  (children under the age 18 who use or access the services) and
                  Adult Users (parents and legal guardians of Child Users).
                  Adult Users are responsible for setting up their Child User’s
                  account and subscription to the Services.
                </p>
                <br />
                <p className="text-gray-600  text-md font-sans">
                  3.Permitted Use The Service is to be used to access courses
                  offered by SET online school. SET gives the User the sole,
                  untransferable, limited licenses to visit, access, view, use,
                  download and print the Content exclusively for the User’s
                  individual non-commercial use, corresponding to such education
                  programmes, provided the User keeps all copyright and other
                  proprietary notices intact. Use of the Content or other
                  materials for any purpose not explicitly permitted in these
                  Terms is prohibited.
                </p>
                <br />
                <p className="text-gray-600  text-md font-sans">
                  4.Breaches and violations Users should not (a) disclose any
                  other’s or a minor’s personal information this includes –
                  name, email, phone number, or related information to others
                  without their approval or parental consent; (b) copy and/or
                  redistribute content provided by the Service; (c) infringe any
                  trademark, copyright, trade secret, patent, or any other
                  intellectual property laws or use the intellectual property of
                  any other entity or person without the permission of the owner
                  – this includes sharing links to and including other
                  trademarked or copyrighted material from third parties
                  obtained from the Service without consent as well as using any
                  service marks, trademarks or their marks on any website or in
                  social media without the permission of the owner; (d) intrude
                  in the files, folders or work of other individuals; (e)
                  endorse commercial activities except as specified in writing
                  by SET; (f) promote products or services or participate in
                  political lobbying; (g) harass, defame, mistreat, insult,
                  threaten, stalk, attack, or otherwise violate the legal rights
                  (like publicity and privacy) of another individual or get in
                  the way of another person’s work, including sending messages
                  of unnecessary emails or WhatsApp messages; (h) alter,
                  obscure, or remove the content in any matter except as advised
                  in writing by SET; (i) use the Service in any way that may
                  harm, halt, impair, overload, or interfere with the use of the
                  Service by any other party; (J) gain or make an effort to gain
                  unauthorised access to any computer systems or accounts
                  connected to any of SET servers through password mining,
                  hacking or any other means; (k) gain or attempt to gain
                  information or materials through any methods not purposely
                  made available through the Service; (l) send, receive, or show
                  obscene, pornographic, sexually explicit material or any other
                  material that is harmful to minors; (m) impersonate any entity
                  or individual (by using their password or any other means),
                  this includes any representative or employee of SET; (n) use
                  the communication platforms or groups of the school to
                  propagate surveys, schemes, promotions, junk-emails, spams, or
                  any superfluous or duplicative messages (commercial or
                  non-commercial); (o) upload files that include viruses, warms,
                  cancelbots, time bombs, Trojan horses, corrupted files, or any
                  other malicious codes or software that can damage the
                  operation of any property or computer; (p) request or gather
                  personal information (this includes name, phone number, and
                  email) from any individual below eighteen years of age without
                  confirmed parental consent; (q) display offensive or
                  threatening material, this includes swear words, insulting,
                  vulgar, obscene, or repugnant language; (r) display
                  ethnically, racist, or discriminately pictures or messages;
                  (s) violate any applicable laws that may bring liability to
                  SET.
                </p>
                <br />
                <p className="text-gray-600  text-md font-sans">
                  5.Confidentiality of the Credentials Every account has one
                  designated Adult User who must be at least 18 years of age.
                  You are responsible for maintaining the confidentiality of
                  your password and Account information. You also agree (a) that
                  you will provide complete and accurate information at
                  registration; (b) that you are solely responsible for all
                  activities that occur under your account; (c) that you will
                  notify us immediately of any unauthorized Account use; (d)
                  that we are in no way responsible for any loss that you may
                  incur as a result of any authorized use of your Account and
                  password; and (e) that you will not sell, transfer, or assign
                  your Account or any Account rights. If we learn that an
                  ineligible User has created an Account, we may seek
                  confirmation of the User’s status or deactivate the Account
                  without notice to the ineligible User.
                </p>
                <br />
                <p className="text-gray-600  text-md font-sans">
                  6.Account Fess We charge a fee, a Course access or
                  subscription. For existing subscribers, we may revise the fee
                  at any time in our sole discretion at the end of your
                  subscription period, provided that we first notify you by
                  email. All fees are payable in accordance with payment terms
                  in effect at the time the fee or the charge becomes payable.
                </p>
                <br />
                <p className="text-gray-600  text-md font-sans">
                  7.Payment Processing You must use mobile money payment
                  mechanism (Airtel or MTN Zambia) to activate and maintain a
                  paid Account. We use a third-party service provider to process
                  payments on our behalf. You acknowledge and agree that in the
                  event the third-party fee collector experiences a data breach
                  that affects your information through no fault of Company,
                  Company will not in no way be responsible or liable to you for
                  any such breach.{" "}
                </p>
                <br />
                <p className="text-gray-600  text-md font-sans">
                  8.Subscription Renewal Subscription is for a 30-day access
                  with a fixed start and end date. By activating an Account, you
                  agree that there will be no claim for lost days in the event
                  that subscription is made after the start date of the course.
                  For example: If the course start date is 1 February, your
                  subscription will be due on March 1, April 1, and so on. If
                  you subscribe after 1 February say on 5,6 or 7 February, your
                  subscription will still be due on March 1. However, when a
                  date does not occur in a month, your due date will be the last
                  day of the month. For example, if you activated your Account
                  on January 31, your renewal date will be on February 28 (or 29
                  in a leap year).
                </p>
                <br />
                <p className="text-gray-600 text-md font-sans">
                  9.Cancellation and Refunds Without prejudice to any statutory
                  rights you may have, we do not provide full or partial refunds
                  for prepaid sums. In any event, you will be able to continue
                  to use the Services throughout the remainder of the
                  subscription period for which you have already paid.
                </p>
                <br />
                <p className="text-gray-600  text-md font-sans">
                  10.Proprietary Rights The User acknowledges and agrees that
                  some of the information available is protected by different
                  trademarks, service marks, patents, copyrights, trade secrets,
                  or any other intellectual property rights and laws and should
                  only be used as allowed by law and with the authorisation of
                  the owner. Except as explicitly authorised by SET, users can
                  not copy, sell, rent, license, modify, distribute, transmit,
                  edit, reproduce, adapt, openly display or publish, or create
                  derived works from or otherwise utilise the Content or
                  features in the learning platform in any medium or from.
                </p>
                <br />
                <p className="text-gray-600 text-md font-sans">
                  11.Copyright infringement Content is owned or controlled by
                  SET or the third party attributed as the service provider, and
                  its contents should not be copied, circulated, reproduced, or
                  customized in any way without the explicit written consent of
                  SET.
                </p>
                <br />
                <p className="text-gray-600  text-md font-sans">
                  12.Links The SET website (set.edu.zm) includes links to other
                  websites or resources that are provided for the convenience of
                  the users. Unless otherwise stated these linked sites are not
                  under the control of SET online school and SET is not
                  accountable for the content available on third party linked
                  sites. SET makes no warranties, representations, or any other
                  commitments about any third party websites or third-party
                  resources that might be accessible from, referenced to, or
                  linked to SET. A link to a website does not mean SET is not
                  accountable for the availability of such external resources or
                  websites except where explicitly contracted for, and is not
                  accountable for any content, products, services, or other
                  materials available on or from those resources.
                </p>
                <br />
                <p className="text-gray-600 text-md font-sans">
                  13.Privacy You agree that the use of the Service is also
                  dependent on the Privacy Policy, which is also part of these
                  Terms
                </p>
                <br />
                <p className="text-gray-600 text-md font-sans">
                  14.Export Control SET operates in Zambia and makes no
                  declaration that the Content is available or suitable for use
                  in other locations. If the Service is used from other
                  locations, you are accountable for compliance with pertinent
                  laws.{" "}
                </p>
                <br />
                <p className="text-gray-600  text-md font-sans">
                  15.Representations and Warranties The User, by the act of
                  logging onto the website and/or by submitting Registration
                  Data is deemed to have consented to and has
                  expressly/impliedly and irrevocably authorised SET to use,
                  reveal, analyse, display or transmit all information required
                  by SET. The User represents and warrants that all the
                  information provided by him/her are true, correct and complete
                  and if such information is found to be untrue, incorrect or
                  incomplete, SET has the right to take any action it deems
                  appropriate in relation to the particular circumstances
                  without any limitations. You represent and warrant that you
                  own or otherwise control all the rights to the content that
                  you post or that you otherwise provide through on or through
                  the Website; that as at the date the content or material is
                  submitted to the Website (a) the content and material is
                  accurate; (b) the use of the content and material supplied by
                  you does not breach any applicable policies of the Website or
                  any guidelines herein and will not cause injury to any person
                  or entity (including that the content or material is not
                  defamatory); and (c) the content is lawful and does not
                  violate any applicable laws.
                </p>
                <br />
                <p className="text-gray-600  text-md font-sans">
                  16.Disclaimer YOUR ACCESS TO AND USE OF THE SERVICES IS AT
                  YOUR SOLE RISK. THE SERVICES ARE PROVIDED ON AN ‘‘AS IS,’’ “AS
                  AVAILABLE,” AND “WITH ALL FAULTS” BASIS. Therefore, to the
                  fullest extent permissible by law, we and affiliates and each
                  of their respective employees, directors, members, managers,
                  shareholders, agents, vendors, licensors, licensees,
                  contactors, customers, successors, and assigns (collectively,
                  Company Parties) hereby to the maximum extent permissible by
                  law, disclaim and make no representations, warranties,
                  endorsements, or promises, express or implied, as to the
                  following: (a)The Services (including the Content and
                  User-Generated Content); (b)The functions, features or any
                  other elements on, or made accessible through, the Services;
                  (c)Any products, services or instructions offered or
                  referenced at or linked through the Services (d)Whether the
                  Services (and their Content), or the servers that make the
                  Services available, are free from any harmful components
                  (including viruses, Trojan horses, and other technologies that
                  could adversely impact your Internet Device) (e)The specific
                  availability of the Services, and whether any defects in the
                  Services will be repaired or will be repaired in a particular
                  time frame; and (f)Whether your use of the Services is lawful
                  in any particular jurisdiction EXCEPTING ONLY AD MAY BE
                  SPECIFICALLY SET FORTH ON ANY ADDITIONAL TERMS, THE COMPANY
                  PARTIES HEREBY FURTHER DISCLAIM ALL WARRANTIES, EXPRESS OR
                  IMPLIED, INCLUDING THE WARRANTIES OF MERCHANTABILITY, FITNESS
                  FOR A PARTICULAR PURPOSE, ONINFRINGEMENT OR MISAPPROPRIATION
                  OF INTELLECTUAL PROPERTY RIGHTS OF THIRD PARTIES, TITLE,
                  CUSTOM, TRADE QUIRTE ENJOYMENT, SYSTEM INTEGRATION, AND
                  FREEDOM FROM ERRORS, COMPUTER VIRUSES, OR OTHER HARMFUL
                  ELEMENTS
                </p>
                <br />
                <p className="text-gray-600  text-md font-sans">
                  17.Limitation of Liability On no account will SET be
                  accountable for any direct, indirect, incidental, punitive,
                  special, or consequential damages that ensure from the use or
                  failure to make use of the Service.{" "}
                </p>
                <br />
                <p className="text-gray-600  text-md font-sans">
                  18.Release The User hereby releases and perpetually discharges
                  SET, its affiliates employees, directors, contractors, agents,
                  successors and assigns (“released parties”) from all causes of
                  action, actions, claims, damages, injuries, costs, or expenses
                  of any type resulting from or related to the user or minor’s
                  user use of the Service. The User acknowledges this is a full
                  release to the maximum extent allowed by law of all claims and
                  damages to which the user may have as a result of his or her
                  use of the Service irrespective of the exact cause thereof.{" "}
                </p>
                <br />
                <p className="text-gray-600  text-md font-sans">
                  19.Indemnification The User agrees to protect, indemnify, and
                  hold harmless SET and its affiliates, contractors, employees,
                  directors and third-party content providers from all claims
                  and liabilities which may arise from the User’s use or misuse
                  of the Service.{" "}
                </p>
                <br />
                <p className="text-gray-600  text-md font-sans">
                  20.Severability and Integration The User acknowledges and
                  agrees that these Terms comprise the entire agreement between
                  SET and the User with regard to the use of the Service.
                </p>
                <br />
                <p className="text-gray-600  text-md font-sans">
                  21.Revision of Terms We reserve the right to modify these
                  Terms, from time to time in our sole without giving any notice
                  (Updated Times). You agree that any Updated Terms will be
                  effective immediately upon our posting them on the Services
                  and, if you have an Account, directly by email.{" "}
                </p>
                <br />
                <p className="text-gray-600  text-md font-sans">
                  22.Termination of Use If the User infringes these Terms, the
                  User may be banned from any future use of the Service. Grounds
                  for such termination, suspension and/or deletion of Account
                  include but not limited to (a) violations or breaches of the
                  Terms; (b) request by government agencies or law enforcement:
                  (c) request by the User (self-initiated account deletion); (d)
                  material modification or discontinuance of the Service (or any
                  component thereof); (e) unanticipated security or technical
                  problems or issues; (f) inactivity for an extended period of
                  time; and (g) engagement in illegal or fraudulent activities
                  by the User In addition, you agree that all terminations for
                  cause will be at the sole discretion of SET and that SET will
                  not be accountable to you or any third party for the
                  termination of access to the Service or that of your account.
                </p>
                <br />
                <p className="text-gray-600 text-md font-sans">
                  23.Governing Law Any dispute resolutions shall be governed by
                  and construed in accordance with Zambian laws. Any disputes
                  between the parties in reference to these Terms shall be
                  resolved by way of Mediation; by a mediator appointed by the
                  parties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default termsConditions;
