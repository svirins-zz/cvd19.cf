import React from "react";

export const DonatePayPalButton = () => {
  return (
    <form action="https://www.paypal.com/donate" method="post" target="_top">
      <input type="hidden" name="hosted_button_id" value="X5PHDJVK2G78W" />
      <input
        type="image"
        src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif"
        className="no-border"
        name="submit"
        title="PayPal - The safer, easier way to pay online!"
        alt="Donate with PayPal button"
      />
      <img
        alt=""
        className="no-border"
        src="https://www.paypal.com/en_BY/i/scr/pixel.gif"
        width="1"
        height="1"
      />
    </form>
  );
};
