<template>
  <div class="vue-tempalte">
    <!-- <form @:submit.prevent="submit"> -->
    <h3>Sign In</h3>

    <div class="form-group">
      <label>Email address</label>
      <input
        type="email"
        class="form-control form-control-lg"
        v-model="email"
        v-on:keyup.enter="submit"
      />
    </div>

    <div class="form-group">
      <label>Password</label>
      <input
        type="password"
        class="form-control form-control-lg"
        v-model="pw"
        v-on:keyup.enter="submit"
      />
    </div>

    <button class="btn btn-dark btn-lg btn-block" v-on:click="submit">
      Sign In
    </button>
    <div class="error-message" v-if="login_error">{{ login_error }}</div>
    <!-- </form> -->
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      email: "",
      pw: "",
      login_error: undefined,
    };
  },
  methods: {
    submit: function () {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.pw)
        .then(data => {
          this.$store.state.email = this.email
          this.$store.state.uid = data.user.uid
          this.$store.commit("storeState")
          this.$router.push("/main");
        })
        .catch((error) => {
          this.login_error = error.message;
        });
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

.form-control-lg {
  font-size: 14px
}
.error-message {
  max-width: 278px;
  font-size: 12px;
  display: block;
  width: 100%;
  border-radius: 0.3rem;
  background-color: red;
  color: white;
  margin-top: 10px;
}

body {
  /* background: #2554ff !important; */
  min-height: 100vh;
  display: flex;
  font-weight: 400;
}

body,
html,
.App,
.vue-tempalte,
.vertical-center {
  width: 100%;
  height: 100%;
}

.navbar-light {
  background-color: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
}

.vertical-center {
  display: flex;
  text-align: left;
  justify-content: center;
  flex-direction: column;
}

.inner-block {
  width: 450px;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all 0.3s;
}

.vertical-center .form-control:focus {
  border-color: #2554ff;
  box-shadow: none;
}

.vertical-center h3 {
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
}

label {
  font-weight: 500;
}

.forgot-password,
.forgot-password a {
  text-align: right;
  font-size: 13px;
  padding-top: 10px;
  color: #7a7a7a;
  margin: 0;
}

.forgot-password a {
  color: #2554ff;
}

.social-icons {
  text-align: center;
  font-family: "Open Sans";
  font-weight: 300;
  font-size: 1.5em;
  color: #222222;
}

.social-icons ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.social-icons ul li {
  display: inline-block;
  zoom: 1;
  width: 65px;
  vertical-align: middle;
  border: 1px solid #e3e8f9;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  margin-right: 5px;
  background: #f4f6ff;
}

.social-icons ul li a {
  display: block;
  font-size: 1.4em;
  margin: 0 5px;
  text-decoration: none;
}
.social-icons ul li a i {
  -webkit-transition: all 0.2s ease-in;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -ms-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

.social-icons ul li a:focus i,
.social-icons ul li a:active i {
  transition: none;
  color: #222222;
}
</style>