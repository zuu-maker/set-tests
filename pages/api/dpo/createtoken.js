import fetch from "node-fetch";

const url = "https://secure.3gdirectpay.com/API/v6/";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    // Process a POST request
    res.status(400).json({ text: "you should not be here" });
    return;
  }

  const { amount, email, phone, date, refToken } = req.body;

  //set redirect url for success page
  //we are sending the reftoken to query transsasctions
  let uri = "http://localhost:3000//payment-success/" + refToken;
  console.log(process.env.NEXT_PUBLIC_API_KEY);
  //xml body request send to DPO
  let xmlBody =
    '<?xml version="1.0" encoding="utf-8"?>' +
    "<API3G>" +
    "<CompanyToken>" +
    process.env.LIVE_COMPANY_TOKEN +
    "</CompanyToken>" +
    "<Request>createToken</Request>" +
    "<Transaction>" +
    "<PaymentAmount>" +
    amount +
    "</PaymentAmount>" +
    "<PaymentCurrency>ZMW</PaymentCurrency>" +
    "<CompanyRef>" +
    process.env.COMPANY_REF +
    "</CompanyRef>" +
    "<customerPhone>" +
    phone +
    "</customerPhone>" +
    "<customerEmail>" +
    email +
    "</customerEmail>" +
    "<RedirectURL>http://www.domain.com/backurl.php</RedirectURL>" +
    "<BackURL>http://www.domain.com/backurl.php </BackURL>" +
    "<CompanyRefUnique>" +
    process.env.COMPANY_REF_UNIQUE +
    "</CompanyRefUnique>" +
    "<PTL>1</PTL>" +
    "</Transaction>" +
    "<Services>" +
    "<Service>" +
    "<ServiceType>66166</ServiceType>" +
    "<ServiceDescription>Monthly Subscription</ServiceDescription>" +
    "<ServiceDate>" +
    date +
    "</ServiceDate>" +
    "</Service>" +
    "</Services>" +
    "</API3G>";

  try {
    //content type is set to xml
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
      },
      body: xmlBody,
    });

    //the content is then convert to text and send client side
    const data = await response.text();
    console.log(data);
    res.status(200).json({
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error creating transaction token",
      error,
    });
  }

  res.status(200).json({
    amount,
    email,
    phone,
    date,
    refToken,
  });
}
