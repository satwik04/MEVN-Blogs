import axios from "axios";

const url = "/auth";

class authServices {
  static signUp(email, password) {
    axios
      .post(url + "/signup", {
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static Login(email, password) {
      try {
        return axios.post(url + "/login", {
          email,
          password,
        }).then((res)=>{
            console.log(res + 'here')
        });
      } catch (err) {
        console.log(err.response.message)
      }
 }

  static ResetPassword(email) {
    return axios.post(url + "/reset", {
      email,
    });
  }
  static VerifyToken(token) {
    return axios.get(`${url}/reset/${token}`);
  }
  static ChangePassword(password, passwordToken, userId) {
    return axios.post(url + "/new-password", {
      password: password,
      passwordToken: passwordToken,
      userId: userId,
    });
  }
}
export default authServices;
