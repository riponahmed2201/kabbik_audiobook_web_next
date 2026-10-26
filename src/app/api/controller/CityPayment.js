export const postCityBankApi = async (body) => {
  const myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/json");
  const url = `https://api.kabbik.com/v4/city-pay/redirect-payment`;
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body
  };

  try {
    const response = await fetch(url, requestOptions);
    return await response.json();
  } catch (err) {
    return false;
  }
};