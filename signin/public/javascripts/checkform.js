var checkform = {
  form: {
    username: {
      status: false,
      errorMessage: ''
    },
    password: {
      status: false,
      errorMessage: ''
    },
    repeat: {
      status: false,
      errorMessage: '密码不一致'
    },
    stuID: {
      status: false,
      errorMessage: ''
    },
    phone: {
      status: false,
      errorMessage: ''
    },
    email: {
      status: false,
      errorMessage: ''
    }
  },

  isusernameValid: function (username) {
    this.form.username.status = /^[a-zA-z]\w{5,17}$/.test(username);
    this.form.username.errorMessage = this.form.username.status ? '' : '用户名格式错误';
    return this.form.username.status;
  },

  ispasswordValid: function (password){
    this.password = password;
    this.form.password.status = /^[\w\-]{6,12}$/.test(password);
    this.form.password.errorMessage = this.form.password.status ? '' : '密码格式错误';
    return this.form.password.status;
  },

  isrepeatValid: function (repeat){
    return this.form.repeat.status = (repeat == this.password);
  },

  isstuIDValid: function (stuID){
    this.form.stuID.status = /^[1-9]\d{7}$/.test(stuID);
    this.form.stuID.errorMessage = this.form.stuID.status ? '' : '学号格式错误';
    return this.form.stuID.status;
  },

  isphoneValid: function (phone){
    this.form.phone.status = /^[1-9]\d{10}$/.test(phone);
    this.form.phone.errorMessage = this.form.phone.status ? '' : '电话格式错误';
    return this.form.phone.status;
  },

  isemailValid: function (email){
    this.form.email.status = /^[\w\-]+@([a-zA-Z_\-]+\.)+[a-zA-Z]{2,4}$/.test(email);
    this.form.email.errorMessage = this.form.email.status ? '' : '请输入合法的邮箱';
    return this.form.email.status;
  },

  isFieldValid: function(fieldname, value){
    return this["is" + fieldname + 'Valid'](value);
  },

  isFormValid: function(user) {
    var valid = true;
    for (var key in user)
      valid = valid && this.isFieldValid(key, user[key]);
    return valid;
  },

  getErrorMessage: function(fieldname){
    return this.form[fieldname].errorMessage;
  },

  getAllError: function(user) {
    this.isFormValid(user);
    var err = [];
    for (var key in user) {
      if (this.form[key].status == false)
        err.push(this.form[key].errorMessage);
    }
    return err.length > 0 ? new Error(err.join('<br>')) : null;
  }
}

if (typeof module == 'object') { // 服务端共享
  module.exports = checkform;
}
