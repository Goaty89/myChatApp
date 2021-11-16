<template>
  <article class="layout">
    <header>
      <icon-base width="40" height="40" icon-name="avatar" class="icon"
        ><icon-avatar
      /></icon-base>
      <span class="user-name">Charles</span>
    </header>
    <section class="content">Message</section>
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
      <input class="inputMessage" />
      <icon-submit-btn @click="sendMessage" class="submitBtn" />
    </footer>
  </article>
</template>

<script>
import IconBase from "./components/IconBase.vue";
import IconAvatar from "./assets/icons/avatar.vue";
import IconSubmitBtn from "./assets/icons/submitBtn.vue";
import IconAttachment from "./assets/icons/attachment.vue";
import IconEmoji from "./assets/icons/emoji.vue";

export default {
  name: "App",
  components: {
    IconBase,
    IconAvatar,
    IconSubmitBtn,
    IconAttachment,
    IconEmoji,
  },
  data() {
    return {
      isShowing: false,
    };
  },
  methods: {
    sendMessage: function () {
      console.log("send message");
    },
    toggleEmoji: function () {
      console.log("Show emoji");
      this.isShowing = true;
      setTimeout(() => (this.isShowing = false), 500);
    },
  },
};
</script>

<style>
body {
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
.icon {
  padding-right: 15px;
}

.content {
  align-self: flex-end;
  padding-bottom: 8px;
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
.emoji {
  /* background: lightcoral; */
}
.attachment {
  /* background: lightgoldenrodyellow; */
}
.inputMessage {
  width: 100%;
  border-radius: 20px;
  padding: 0.5rem;
}
.submitBtn {
  color: #828689;
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
</style>
