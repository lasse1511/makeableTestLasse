<template>
  <div class="main">
    <div class="header">
      <div class="logged_in_as">Logget ind som: {{ email }}</div>
      <button class="logout_button" v-on:click="logout">Logout</button>
    </div>
    <div class="chatwindow">
      <div class="messages"></div>
      <input
        type="text"
        placeholder="Skriv din besked her - Send ved at trykke enter"
        class="inputField"
        v-on:keyup.enter="add"
        v-model="msg"
      />
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
var db = firebase.firestore();

export default {
  name: "Main",
  data: function () {
    return {
      msg: "",
      email: this.$store.state.email,
    };
  },
  methods: {
    submit: function () {
      console.log(this.$store.state);
      console.log("HEJ", this.msg);
    },
    add() {
      console.log(this.email)
      db.collection("chatinator2000").add({
        value: this.msg,
        email: this.email, 
        datetime_received: new Date()
      });
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          // alert("Successfully logged out");
          this.$router.push("/");
        })
        .catch((error) => {
          alert(error.message);
          this.$router.push("/");
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logout_button {
  position: absolute;
  right: 0;
  background: none;
  border: solid 1px black;
  border-radius: 3px;
  font-size: 12px;
}
.logged_in_as {
  font-size: 12px;
}
.header {
  display: flex;
  position: absolute;
  width: 50%;
  /* height: 90%; */
  /* border: 1px solid black; */
  right: 25%;
  /* bottom: 10%; */
  top: 10px;
  height: fit-content;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.chatwindow {
  position: absolute;
  width: 50%;
  /* height: 90%; */
  border: 1px solid black;
  right: 25%;
  bottom: 10%;
  top: 10%;
}
.main {
  width: 100%;
  height: 100%;
  min-height: 500px;
}

.inputField {
  position: absolute;
  bottom: 0;
  width: 100%;
  right: 0;
  font-size: 12px;
}
.messages {
  position: absolute;
  bottom: 5%;
  width: 100%;
  height: 95%;
  background-color: lightgray;
}
</style>
