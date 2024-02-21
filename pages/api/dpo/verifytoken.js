import fetch from "node-fetch";

const url = "https://secure.3gdirectpay.com/API/v6/";

export default async function handler(req, res) {
  //this is the same transaction token that was attached to the redirect url
  //and now being sent back for verification
  if (req.method !== "POST") {
    // Process a POST request
    res.status(400).json({ text: "you should not be here" });
    return;
  }

  const { token } = req.body;

  //xml body request
  const xmlBody =
    '<?xml version="1.0" encoding="utf-8"?>' +
    "<API3G>" +
    "<CompanyToken>" +
    process.env.COMPANY_TOKEN +
    "</CompanyToken>" +
    "<Request>verifyToken</Request>" +
    "<TransactionToken>" +
    token +
    "</TransactionToken>" +
    "</API3G>";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
      },
      body: xmlBody,
    });

    const data = await response.text();
    res.status(200).json({
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error verifying transaction token",
      error,
    });
  }
}
