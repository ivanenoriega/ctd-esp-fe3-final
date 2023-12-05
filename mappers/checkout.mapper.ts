import { RawCheckoutRequest } from "contracts/checkout.contract";
import { CheckoutInput } from "dh-marvel/features/checkout/checkout.types";

export const toApiCheckout = (data: RawCheckoutRequest): CheckoutInput => {
  return {
    customer: {
      name: data.firstName,
      lastname: data.lastName,
      email: data.email,
      address: {
        address1: data.address,
        address2: null,
        city: data.city,
        state: data.province,
        zipCode: data.postalCode,
      },
    },
    card: {
      number: data.number,
      cvc: data.cvc,
      expDate: data.expiry,
      nameOnCard: data.name,
    },
    order: {
      name: data.comicName,
      image: data.comicImage,
      price: data.comicPrice,
    },
  };
};
