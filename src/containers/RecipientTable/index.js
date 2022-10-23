import Button from "../../components/Button";
import Modal from "../../components/Modal";
import { addRecipient } from "../../features/issuance/issuanceSlice";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { PropTypes } from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const RecipientTable = ({ actionController }) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [recipientList, setRecipientList] = useState([]);

  const deleteRecipient = (index) => {
    const newRecipientList = [...recipientList];
    newRecipientList.splice(index, 1);
    setRecipientList(newRecipientList);
  };

  const createTableRows = () => {
    return recipientList.map((recipient, index) => {
      return (
        <tr className="recipient-table-tr" key={index}>
          <td>{index + 1}</td>
          <td>{recipient[0]}</td>
          <td>{recipient[1]}</td>
          <td>{recipient[2]}</td>
          <td>
            <Button
              styleType="danger"
              onClick={() => deleteRecipient(index)}
              style={{ height: "2.5rem", width: "6.25rem" }}
              text="Delete"
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const recipient = [
      e.target.elements.recipientName.value,
      e.target.elements.walletAddress.value,
      e.target.elements.emailAddress.value,
    ];

    setRecipientList((oldRecipientList) => [...oldRecipientList, recipient]);

    e.target.reset();
  };

  const handleEscape = (e) => {
    if (e.key === "Escape") {
      setOpenModal(false);
    }
  };

  const handleContinue = () => {
    recipientList.forEach((recipient) => {
      const recipientObj = {
        recipient_name: recipient[0],
        recipient_pubkey: recipient[1],
        recipient_email: recipient[2],
      };
      dispatch(addRecipient(recipientObj));
    });

    actionController("toSelectTemplate");
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleEscape, false);

    return () => {
      document.removeEventListener("keydown", handleEscape, false);
    };
  }, []);

  return (
    <div className="recipient-table-container">
      <div className="certinize-modal" id="modal">
        <Modal
          open={openModal}
          title="Issue Certificate"
          onClose={() => setOpenModal(false)}
        >
          <div className="certinize-modal-body">
            Distribute certificate to five (5) recipients?
          </div>
          <div className="modal-btn-group">
            <div className="btn-group-col">
              <Button styleType="danger" text="Cancel">
                Cancel
              </Button>
              <Button text="Transfer">Transfer</Button>
            </div>
          </div>
        </Modal>
      </div>
      <div className="d-flex justify-content-center align-items-start mt-5">
        <div className="w-75">
          <form
            className="content-form"
            onSubmit={handleOnSubmit}
            id="recipientForm"
          >
            <div className="form-group mx-2">
              <label
                className="form-label recipient-table-label"
                htmlFor="recipientName"
              >
                Full Name
              </label>
              <input
                type="text"
                className="form-control recipient-table-input"
                name="recipientName"
                id="recipientName"
                aria-describedby="recipient-name"
                placeholder="Enter Full Name"
              />
            </div>
            <div className="form-group mx-2">
              <label
                className="form-label recipient-table-label"
                htmlFor="walletAddress"
              >
                Wallet Address
              </label>
              <input
                type="text"
                className="form-control  recipient-table-input"
                name="walletAddress"
                id="walletAddress"
                aria-describedby="wallet-address"
                placeholder="Enter Wallet Address"
              />
            </div>
            <div className="form-group mx-2">
              <label
                className="form-label recipient-table-label"
                htmlFor="walletAddress"
              >
                Email
              </label>
              <input
                type="email"
                className="form-control recipient-table-input"
                name="emailAddress"
                id="emailAddress"
                aria-describedby="email-address"
                placeholder="Enter Email"
              />
            </div>
            <Button
              type="submit"
              style={{ margin: 0, width: "6.25rem", height: "3.125rem" }}
              text="Add"
            >
              Add
            </Button>
          </form>

          <div className="recipient-table-user-view">
            <table className="table table-borderless table-hover table-responsive">
              <thead>
                <tr className="recipient-table-tr">
                  <th className="number-col">
                    <p>#</p>
                  </th>
                  <th className="w-25">
                    <p>Name</p>
                  </th>
                  <th className="w-25">
                    <p>Wallet Address</p>
                  </th>
                  <th className="w-25">
                    <p>Email</p>
                  </th>
                  <th className="w-25"></th>
                </tr>
              </thead>
              <tbody>{createTableRows()}</tbody>
            </table>
          </div>
          <div className="recipient-table-button-set">
            <Button onClick={handleContinue} text="Continue">
              Continue
            </Button>
            <Button styleType="danger" text="Cancel">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

RecipientTable.propTypes = {
  actionController: PropTypes.func,
};

export default RecipientTable;
