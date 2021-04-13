import killApi from "./killApi";

const executeApi = (language, time, input) => {
  console.log("executeApi");

  const kill = setTimeout(() => {
    killApi(language);
  }, time * 1000);

  const formData = new FormData();
  formData.append("language", language);
  formData.append("time", time);
  formData.append("input", input);

  return new Promise((resolve, reject) => {
    fetch("./api/execute.php", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        clearInterval(kill);
        if (res.status >= 400)
          throw new Error("[http error] " + res.statusText);
        return res.json();
      })
      .then((res) => {
        if (res.success)
          resolve({
            result: res.data.result.replace(/\r\n/g, "\n"),
            time: res.data.time,
          });
        else reject(res.data);
      })
      .catch((error) => {
        reject(error.toString());
      });
  });
};

export default executeApi;
