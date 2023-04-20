import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { CREATE_TICKET_URL } from "../commons/constant";
import { toast } from "react-toastify";
const discordIcon = <FontAwesomeIcon icon={faDiscord} size="lg" />;
const atSignIcon = <FontAwesomeIcon icon={faAt} size="lg" />;

const Contact = () => {
  const navigate = useNavigate();

  const submitTicket = async (e) => {
    e.preventDefault();
    console.log(`login button clicked!`);
    const name = e.target.name.value;
    const email = e.target.email.value;
    const detail = e.target.detail.value;
    const data = { name, email, detail };
    console.log(`body: `, data);

    fetch(`${CREATE_TICKET_URL}`, {
      method: "POST",
      headers: {
        // "Accept": "application/json text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log(`ticket res: `, res);
        return res.json();
      })
      .then((data) => {
        console.log(`ticket data: `, data);
        toast.success("Successfully ticket created");
        navigate("/");
      })
      .catch((err) => {
        console.log(`ticket err: `, err);
        toast.error("Failed to create ticket. Something went wrong!");
      });
  };

  return (
    <div className="app_contact">
      <div className="app_forms w-12/12 lg:w-9/12 xl:w-8/12 sm:mx-auto mt-8 p-10 md:px-20 rounded-[30px] bg-white">
        <div className="text-center">
          <h2 className="text-[30px] font-[600]">Contact Us</h2>
          <form
            className="app_forms-form mt-4 text-[12px] md:text-[18px]"
            onSubmit={submitTicket}
          >
            <input
              type="text"
              name="name"
              required
              className="w-full border-2 rounded-[46px] py-3 indent-6 font-[400]"
              placeholder="Your Name"
            />
            <input
              type="email"
              name="email"
              required
              className="w-full border-2 rounded-[46px] py-3 indent-6 font-[400] my-6"
              placeholder="Email"
            />
            <textarea
              name="detail"
              required
              className="w-full border-2 rounded-[30px] py-3 indent-6 font-[400] text-[20px] h-[150px]"
              placeholder="Ticket"
            ></textarea>
            <div className="flex justify-between items-center">
              <button
                className="submit_ticket-btn main_btn mt-8 m-auto bg-pink-600 text-white"
                type="submit"
              >
                Submit Ticket
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="text-center mt-10">
        <h2 className="md:text-[60px] font-[500]">Our Social Media</h2>
        <ul className="app_contact-icons bordered_icons flex justify-center">
          {[discordIcon, atSignIcon].map((icon, i) => (
            <li key={i}>
              <a href="/">{icon}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Contact;
