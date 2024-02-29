// "use client";
// import React, { useState } from "react";
// import Modal from "react-modal";
// import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
// import { useUser } from "@/hooks/auth/useUser";

// interface PaymentProp {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const customStyles: Modal.Styles = {
//   overlay: {
//     position: "fixed",
//     top: 0,
//     right: 0,
//     bottom: 0,
//     opacity: "1",
//   },
//   content: {
//     borderRadius: "10px",
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "50%",
//     marginRight: "-50%",
//     opacity: "1",
//   },
// };

// const PaymentModal = ({ isOpen, onClose, selectedPayment }) => {
//   const { data: user } = useUser();

//   const [paymentLoading, setPaymentLoading] = useState(false);
//   const [amount, setAmount] = useState("");

//   const hanldeAmountChange = (e: {
//     target: { value: React.SetStateAction<string> };
//   }) => {
//     setAmount(e.target.value);
//   };

//   const config = {
//     public_key: "FLWPUBK_TEST-36c70b4b57f3f789e4d3cdda3ab847d4-X",
//     tx_ref: "1234",
//     amount: amount,
//     currency: "NGN",
//     payment_options: "card,mobilemoney,ussd",
//     customer: {
//       email: `${user?.user?.email}`,
//       phone_number: `${user?.user.phoneno}`,
//       name: `${user?.user?.user_name}`,
//     },
//     // meta: {
//     //   transactionId: Date.now(),
//     //   transactionTypes: "PAYMENT",
//     //   amount: enteredAmount,
//     //   userId: currentUser?.data?.user?.id,
//     // },
//     customizations: {
//       title: "PlanetF",
//       description: "Payment for items in cart",
//       logo: "https://st2.https://public-files-paystack-prod.s3.eu-west-1.amazonaws.com/integration-logos/TIVCK4thz5y5Xfq76dvc.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
//     },
//   };

//   const handleFlutterPayment = useFlutterwave(config);

//   const payWithFlutterwave = () => {
//     setPaymentLoading(true);
//     const config = {
//       public_key: "FLWPUBK_TEST-36c70b4b57f3f789e4d3cdda3ab847d4-X",
//       tx_ref: "1234",
//       amount: amount,
//       currency: "NGN",
//       payment_options: "card,mobilemoney,ussd",
//       customer: {
//         email: user?.user?.email,
//         phone_number: user?.user?.phoneno,
//         name: user?.user?.user_name,
//       },
//       customizations: {
//         title: "PlanetF",
//         description: "Payment for items in cart",
//         logo: "https://st2.https://public-files-paystack-prod.s3.eu-west-1.amazonaws.com/integration-logos/TIVCK4thz5y5Xfq76dvc.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
//       },
//     };
//     handleFlutterPayment({
//       callback: async (response) => {
//         console.log(response, "flutter payment success");
//         // Handle the payment success case and show a confirmation message
//         // Close the modal
//         onClose();
//       },
//       onClose: () => {
//         console.log("Payment modal closed");
//         // Close the modal
//         onClose();
//       },
//     });
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onClose}
//       style={customStyles}
//       ariaHideApp={false}
//       shouldCloseOnOverlayClick={true}
//       shouldCloseOnEsc={true}
//       contentLabel="Start Project Modal"
//       overlayClassName={`left-0 bg-[#00000070] outline-none transition-all ease-in-out duration-500`}
//       className="w-full h-full flex items-center justify-center"
//     >
//       <div className="bg-white px-10 py-10 flex flex-col gap-10 w-[20%]">
//         <h2>{selectedPayment} Checkout Process</h2>
//         <label>Amount:</label>
//         <input type="text" value={amount} onChange={hanldeAmountChange} />
//         <div className="flex items-center">
//           <button onClick={payWithFlutterwave} disabled={paymentLoading}>
//             {paymentLoading ? "Processing..." : "Pay"}
//           </button>
//           <button onClick={onClose()}>Cancel</button>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default PaymentModal;
