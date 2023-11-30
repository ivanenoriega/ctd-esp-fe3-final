import {
    CheckoutInput,
    Order,
  } from "interfaces/types";
  
  interface Props {
    order: Order
  }
  
  export const postOrder = async ({ order }: Props) => {
    const { comic, buyer } = order;
  
    if(!comic || !buyer || !buyer.personalInfo || !buyer.deliveryInfo || !buyer.paymentInfo) return
  
    const image =
      comic.images && comic.images.length > 0
        ? `${comic.images[0].path}.${comic.images[0].extension}`
        : '';
  
    const body: CheckoutInput = {
      order: {
        image,
        name: comic.title,
        price: comic.price,
      },
      customer: {
        name: buyer.personalInfo.name,
        lastname: buyer.personalInfo.lastname,
        email: buyer.personalInfo.email,
        address: {
          address1: buyer.deliveryInfo.address,
          address2: buyer.deliveryInfo.address2 || "",
          city: buyer.deliveryInfo.city,
          state: buyer.deliveryInfo.province,
          zipCode: buyer.deliveryInfo.zip,
        },
      },
      card: {
        number: buyer.paymentInfo.number,
        nameOnCard: buyer.paymentInfo.name,
        expDate: buyer.paymentInfo.expiry,
        cvc: buyer.paymentInfo.cvc
      }
    };
  
    const requestOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
  
    const response = await fetch(
      "/api/checkout",
      requestOptions
    );
    
  
    return response;
  };
  