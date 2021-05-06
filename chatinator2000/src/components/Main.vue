<template>
  <div class="main">
    <div class="header">
      <div class="logged_in_as">Logget ind som: {{ email }}</div>
      <button class="logout_button" v-on:click="logout">Logout</button>
    </div>
    <div class="chatwindow">
      <div id="messages" class="messages">
        <div
          class="flexcol message"
          v-for="message in messages"
          :key="message.id"
        >
          <div
            v-if="message.data.value"
            v-bind:class="{
              ownName: message.data.email.toLowerCase() == email,
              otherName:
                message.data.email.toLowerCase() != email,
            }"
          >
            {{ message.data.email.toLowerCase() }}
          </div>
          <div
            v-if="message.data.value"
            v-bind:class="{
              ownMsg: message.data.email.toLowerCase() == email,
              otherMsg: message.data.email.toLowerCase() != email,
            }"
          >
            {{ message.data.value }}
          </div>
        </div>
      </div>
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
      email: this.$store.state.email.toLowerCase(),
      messages: [],
    };
  },
  methods: {
    add() {
      db.collection("messages").add({
        value: this.msg,
        email: this.email,
        datetime_received: new Date(),
      });
      this.msg = "";
    },
    populateMessages() {},
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.state.email = "";
          this.$store.state.uid = "";
          this.$router.push("/");
        })
        .catch((error) => {
          alert(error.message);
          this.$router.push("/");
        });
    },
  },
  mounted: function () {
    firebase
      .auth()
      .fetchSignInMethodsForEmail(this.$store.state.email)
      .then((result) => {
        console.log("result", result);
      })
      .catch((err) => {
        this.$router.push("/");
        console.log(err);
      });
    db.collection("messages")
      .orderBy("datetime_received", "desc")
      .onSnapshot((doc) => {
        this.messages = doc.docs.map((doc) => {
          return { id: doc.id, data: doc.data() };
        });
        var container = this.$el.querySelector("#messages");
        container.scrollTop = container.scrollHeight;
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.flexcol {
  display: flex;
  flex-direction: column;
}
.ownName {
  font-size: 8px;
  margin-left: auto;
}

.otherName {
  font-size: 8px;
  margin-right: auto;
}
.message {
  margin: 8px;
}
.ownMsg {
  background: #007aff;
  color: white;
  /* width: 50%; */
  /* margin: 8px; */
  border-radius: 8px;
  text-align: left;
  padding-left: 6px;
  width: fit-content;
  padding-right: 6px;
  max-width: 50%;
  margin-left: auto;
}

.otherMsg {
  background: #949494;
  color: white;
  /* width: 50%; */
  /* margin: 8px; */
  border-radius: 8px;
  text-align: left;
  padding-left: 6px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  padding-right: 6px;
  max-width: 50%;
  margin-right: auto;
}
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
  top: 40px;
}
.main {
  overflow: hidden;
}

.inputField {
  position: absolute;
  bottom: 0;
  width: 100%;
  right: 0;
  font-size: 12px;
  padding: 5px;
}
.messages {
  position: absolute;
  height: 100%;
  padding-bottom: 35px;
  width: 100%;
  height: 100%;
  background-color: rgba(211, 211, 211, 0.149);
  display: flex;
  flex-direction: column-reverse;
  overflow-y: scroll;
}
</style>
