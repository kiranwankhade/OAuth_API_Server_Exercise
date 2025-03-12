//Helper Function
require("dotenv").config();

function setSecureCookie(res, token) {
  res.cookie("access_token", token, {
    httpOnly: true,   // Prevent JavaScript access
    secure: process.env.NODE_ENV === "production", // Secure in production
    sameSite: "None",  // Adjust if needed
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  return res;
}

module.exports = {setSecureCookie}