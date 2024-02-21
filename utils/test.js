import { db } from "@/firebase";

export function getTestInVerify(testId, amount) {
  return db
    .collection("Tests")
    .doc(testId)
    .get()
    .then((res) => {
      let { image, timeStamp, title, id, price } = res.data();
      let date = new Date();
      let future = new Date(); // get today date
      future.setDate(date.getDate() + 7);
      console.log(future.toISOString());

      let test = {
        id,
        title,
        image,
        timeStamp,
        price,
        renewDate: future.getTime(),
        paidOn: date.getTime(),
        subscribed: true,
      };

      return test;
    })
    .catch((error) => {
      console.log(error);
    });
}
