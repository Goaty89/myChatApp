<template>
  <article class="layout">
    <header>
      <div class="avatar" v-if="authUser.displayName">
        <icon-base width="40" height="40" icon-name="avatar" class="icon"
          ><icon-avatar
        /></icon-base>
        <span class="user-name">{{ authUser.displayName }}</span>
      </div>
      <login v-if="!authUser.displayName" class="loginBtn" />
    </header>
    <section class="content">
      <div
        v-for="message in messages"
        :key="message.id"
        :class="
          message.author === authUser.displayName
            ? 'outgoing-msg'
            : 'incoming-msg'
        "
      >
        <span class="right-tail" />
        <p>{{ message.message }}</p>
        <span class="time">{{
          new Date(message.createAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })
        }}</span>
      </div>
      <InfiniteLoading :messages="history" @infinite="load" />
    </section>
    <footer>
      <icon-base icon-name="avatar" class="emoji"
        ><icon-emoji @click="toggleEmoji"
      /></icon-base>
      <transition name="fade">
        <app-child v-if="isShowing" class="animateEmoji">
          <span>Hello</span>
        </app-child>
      </transition>
      <icon-base icon-name="avatar" class="attachment"
        ><icon-attachment
      /></icon-base>
      <input
        v-model="message"
        @keyup.enter="saveMessage"
        type="text"
        class="inputMessage"
        placeholder="Type a message"
      />
      <icon-submit-btn @click="saveMessage" class="submitBtn" />
    </footer>
  </article>
</template>

<script>
import IconBase from "./components/IconBase.vue";
import IconAvatar from "./assets/icons/avatar.vue";
import IconSubmitBtn from "./assets/icons/submitBtn.vue";
import IconAttachment from "./assets/icons/attachment.vue";
import IconEmoji from "./assets/icons/emoji.vue";
import DataService from "./services/dataService";
import Login from "./components/Login.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { ref } from "vue";
// import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

export default {
  name: "MyChatApp",
  components: {
    IconBase,
    IconAvatar,
    IconSubmitBtn,
    IconAttachment,
    IconEmoji,
    Login,
  },
  data() {
    return {
      isShowing: false,
      message: null,
      messages: [],
      authUser: {},
      lastVisible: null,
      history: [],
    };
  },
  methods: {
    saveMessage: function () {
      const chatData = {
        message: this.message,
        createAt: Date.now(),
        author: this.authUser.displayName,
      };
      DataService.create(chatData);
      this.message = null;
    },
    fetchMessages: function () {
      DataService.getAll(this.messages, this.lastVisible);
    },
    load: async ($state) => {
      console.log("loading...");
      this.history = await DataService.getNext(this.lastVisible);
      try {
        console.log(`this.lastVisible`, this.lastVisible, history);
        if (history.length > 0) $state.loaded();
        else $state.complete();
      } catch (error) {
        $state.error();
      }
    },
  },
  created() {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      console.log(`user -=>`, user);
      if (!user) {
        this.authUser = {};
      } else {
        this.authUser = user;
      }
    });
    this.fetchMessages();
  },
};
</script>

<style>
body,
p {
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #f1f1f2eb;
  background-color: #1e2429;
}

.layout {
  height: 100vh;
  display: grid;
  grid-template-areas:
    "a"
    "b"
    "c";
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 10fr 1fr;
}
header {
  display: flex;
  align-items: center;
  padding: 16px 10px;
  background-color: #2a2f32;
}

.avatar {
  display: flex;
  align-items: center;
}

.icon {
  padding-right: 15px;
}

.content {
  display: flex;
  flex-direction: column;
  padding-bottom: 8px;
  overflow-y: scroll;
  place-content: flex-end;
}

footer {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 10px;
  background-color: #1e2428;
}
.emoji,
.attachment {
  width: 30px;
  height: 30px;
  color: #828689;
  /* border-radius: 50%; */
}

.inputMessage {
  width: 100%;
  border-radius: 20px;
  padding: 0.5rem;
}
.submitBtn {
  color: #828689;
  cursor: pointer;
}

.loginBtn {
  float: right;
}

.animateEmoji {
  background: goldenrod;
  color: black;
  padding: 20px;
  width: 50px;
  position: absolute;
  overflow: hidden;
  animation: float 1s ease-out;
  border-radius: 50%;
}

@keyframes float {
  0% {
    transform: translatey(0px);
  }

  100% {
    transform: translatey(-100vh);
    opacity: 0;
  }
}

.outgoing-msg {
  background: #056162;
  width: fit-content;
  border-radius: 7.5px;
  align-self: end;
  padding: 6px 7px 8px 9px;
  display: flex;
  margin: 0 8px 8px 0;
}

.incoming-msg {
  background: #262d31;
  width: fit-content;
  border-radius: 7.5px;
  align-self: start;
  padding: 6px 7px 8px 9px;
  display: flex;
  margin: 0 0 8px 8px;
}

.right-tail {
  position: absolute;
  top: 0;
  z-index: 100;
  display: block;
  width: 8 px;
  height: 13 px;
  color: #056162;
  right: -8px;
}

.time {
  height: 15 px;
  font-size: 11px;
  line-height: 15px;
  color: #f1f1f2a1;
  white-space: nowrap;
  align-self: flex-end;
  padding: 10px 8px 0px 10px;
}
</style>
