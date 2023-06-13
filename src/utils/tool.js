export function AddrHandle(addr, start = 4, end = 4) {
  if (!addr) {
    return;
  }
  let r = new RegExp("(.{" + start + "}).*(.{" + end + "})");
  let addrArr = addr.match(r);
  return addrArr[1] + "...." + addrArr[2];
}
export function GetQueryString(name, href) {
  let search;
  if (href) {
    search = href.split("?");
  } else {
    search = window.location.href.split("?");
  }
  let parameterArr;
  
  if (search[1]) {
    let hrefInfo = search[search.length-1]
    parameterArr = hrefInfo.split("&");
    parameterArr = parameterArr.map((item) => {
      return item.split("=");
    });
    return Object.fromEntries(parameterArr)[name];
  } else {
    return null;
  }
}
export function dateFormat(fmt, date) {
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "S+": date.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
      );
    }
  }
  return fmt;
}
export function NumSplic(val, len, supplement) {
  var f = parseFloat(val);
  if (isNaN(f)) {
    f = 0;
  }
  var s = f.toString();
  if (s.indexOf(".") > 0) {
    let f = s.split(".")[1].substring(0, len);
    s = s.split(".")[0] + "." + f;
  }
  if (supplement) {
    var rs = s.indexOf(".");
    if (rs < 0) {
      rs = s.length;
      s += ".";
    }
    while (s.length <= rs + len) {
      s += "0";
    }
  }
  return s;
}

// 正则校验
export function checkEmail(rule, value, cb) {
  const regEmail = /^[0-9A-Za-z\\-_\\.]+@[0-9a-z]+\.[a-z]{2,3}([a-z]{2,3})?$/;
  if (value === "") {
    return cb(new Error("Please input the email"));
  }
  if (regEmail.test(value)) {
    //合法的邮箱
    return cb();
  }
  cb(new Error("Please enter a valid email"));
}

export const checkPwd = (rule, value, cb) => {
  if (value === "") {
    return cb(new Error("Please input the password"));
  }
  let pwdReg =
    /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d!@#$%^&*()_+={}\[\]|\\:;"'<,>.?/]{6,20}$/;
  if (pwdReg.test(value)) {
    return cb();
  }
  cb(
    new Error(
      "The password should be at least 1 English letter and 1 number, with a length of 6-20 characters"
    )
  );
};

export const checkInvitationCode = (rule, value, cb) => {
  if (value === "") {
    return cb(new Error("Please input the verification code"));
  }
  if (value.length === 0 || value.length === 6) {
    return cb();
  }
  cb(new Error("Verification code length error"));
};

export const checkAddress = (rule, value, cb) => {
  if (value === "") {
    return cb(new Error("Please input the address"));
  }
  let pwdReg = /^0x[0-9a-fA-F]{40}$/;
  if (pwdReg.test(value)) {
    return cb();
  }
  cb(new Error("Please enter the correct address"));
};
