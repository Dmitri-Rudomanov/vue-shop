import Axios from "axios";

const converter = (currency = "uah") => {
  return Axios.get(
    `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`
  ).catch(function (error) {
    if (error.response) {
      console.log(error.response.status);
      alert(
        "There is an error occured,please reload the page or try again later"
      );
    } else if (error.request) {
      console.log(error.request);
      alert(
        "There is an error occured,please reload the page or try again later"
      );
    } else {
      console.log("Error", error.message);
      alert(error.message);
    }
  });
};
const exportConvert = { converter };
export default exportConvert;
