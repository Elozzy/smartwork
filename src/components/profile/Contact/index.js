import React from "react";
import Widget from "components/Widget";

const Contact = ({authUser}) => {
  const contactList = [
  {
    id: 1,
    title: 'Email',
    icon: 'email',
    desc: [<span className="gx-link" key={1}>{authUser.email}</span>]
  },
  {
    id: 2,
    title: 'Account Status',
    icon: 'user-o',
    desc: [<span className="gx-link" key={2}>{(authUser.verification)?authUser.verification : 'You Have not done any Verification'}</span>]
  }, {
    id: 3,
    title: 'Phone',
    icon: 'phone',
    desc: [`(+234)${authUser.phone_number}`]
  },
];
  return (
    <Widget title="Contact" styleName="gx-card-profile-sm">
      {contactList.map((data, index) =>
        <div key={index} className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list">
          <div className="gx-mr-3">
            <i className={`icon icon-${data.icon} gx-fs-xxl gx-text-grey`}/>
          </div>
          <div className="gx-media-body">
            <span className="gx-mb-0 gx-text-grey gx-fs-sm">{data.title}</span>
            <p className="gx-mb-0">{data.desc}</p>
          </div>
        </div>
      )}
    </Widget>
  )
}

export default Contact;
