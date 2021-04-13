const compileApi = (language, text) => {
  console.log("compileApi");

  const formData = new FormData();
  formData.append("language", language);
  formData.append("text", text);

  return new Promise((resolve, reject) => {
    fetch("./api/compile.php", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (res.status >= 400)
          throw new Error("[http error] " + res.statusText);
        return res.json();
      })
      .then((res) => {
        if (res.success) resolve(res.data);
        else reject(res.data);
      })
      .catch((error) => {
        reject(error.toString());
      });
  });
};

export default compileApi;
