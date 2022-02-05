import React from "react"

export default function Contact({ dataContact, setContact, contact }) {
  const clickContact = (id) => {
    const data = dataContact.find((item) => item.id == id);
    setContact(data)
  };

  return (
    <>
      {/* {dataContact.map((item) => ( */}
        {/* <div
          class={`contact mt-3 px-2 ${
            contact?.id == item?.id && "contact-active"
          }`}
          onClick={() => {
            clickContact(item.id);
          }}
        > */}
          <img src={""} className="rounded-circle me-2 img-contact" alt="user avatar"/>
          <div className="pt-2">
            <ul className="ps-0 text-contact">
              <li>{""}</li>
              <li className="text-contact-chat mt-1">{""}</li>
            </ul>
          </div>
        {/* </div> */}
      {/* ))} */}
    </>
  );
}