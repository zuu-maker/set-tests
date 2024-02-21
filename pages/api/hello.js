// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}

const url = "https://secure.3gdirectpay.com/API/v6/";

export const newCreateToken = async (req, res) => {
  const { amount, email, phone, date, refToken, firstName, lastName } =
    req.body;

  let uri = "https://set.edu.zm//payment-success/";

  let xmlBody =
    '<?xml version="1.0" encoding="utf-8"?>' +
    "<API3G>" +
    "<CompanyToken>" +
    process.env.COMPANY_TOKEN +
    "</CompanyToken>" +
    "<Request>createToken</Request>" +
    "<Transaction>" +
    "<PaymentAmount>" +
    amount +
    "</PaymentAmount>" +
    "<PaymentCurrency>USD</PaymentCurrency>" +
    "<CompanyRef>" +
    process.env.COMPANY_REF +
    "</CompanyRef>" +
    "<customerPhone>" +
    phone +
    "</customerPhone>" +
    "<customerFirstName>" +
    firstName +
    "</customerFirstName>" +
    "<customerLastName>" +
    lastName +
    "</customerLastName>" +
    "<customerEmail>" +
    email +
    "</customerEmail>" +
    "<RedirectURL>" +
    uri +
    "</RedirectURL>" +
    "<BackURL>http://www.domain.com/backurl.php </BackURL>" +
    "<CompanyRefUnique>" +
    process.env.COMPANY_REF_UNIQUE +
    "</CompanyRefUnique>" +
    "<PTL>1</PTL>" +
    "</Transaction>" +
    "<Services>" +
    "<Service>" +
    "<ServiceType>5525</ServiceType>" +
    "<ServiceDescription>Service number 1</ServiceDescription>" +
    "<ServiceDate>" +
    date +
    "</ServiceDate>" +
    "</Service>" +
    "</Services>" +
    "</API3G>";

  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
      },
      body: xmlBody,
    });

    const data = await resp.text();

    res.json({
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
