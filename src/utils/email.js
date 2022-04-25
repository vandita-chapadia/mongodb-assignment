import sgMail from "@sendgrid/mail";
const sgAPI = process.env.SENDGRID_API;

sgMail.setApiKey(sgAPI);

export const sendWelcome = async (email, name) => {
  sgMail.send({
    to: email,
    from: "rajan@simformsolutions.com",
    subject: "Welcome to Lottery System",
    text: `Hello ${name},
        Welcome to the lottery system.
        Your account is all set up.
        You can try your luck here
        All the best...!!!`,
  });
};

export const purchaseConfirm = (user, lottery) => {
  sgMail.send({
    to: user.email,
    from: "rajan@simformsolutions.com",
    subject: "Purchased Successfully",
    text: `Hello ${user.name},
        You have purchased a new lottery named "${lottery.name}" of price ${lottery.purchasePrice} and winning amount of ${lottery.winningPrice}.
        The result of the lottery will be declared on ${lottery.resultDate}
        
        All the best`,
  });
};
