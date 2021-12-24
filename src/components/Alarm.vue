<template>
  <div class="alarm" @click="changeAlarms">
    <div class="alarm_count">
      <img src="../img/alarm.png" alt="alarm" />
      <div class="alarm_count__number">
        {{ alarms.length }}
      </div>
    </div>
    <div v-if="isShowAlarms" class="modal" @click="offModal">
      <ul v-if="alarms.length" class="modal_alarmList">
        <li
          v-for="(alarm, index) in alarms"
          :key="index"
          class="alarmList_alarm"
          @click="goMessage"
        >
          <div class="alarmList_alarm__content">
            <div class="content-profile">
              <img :src="alarm.author.image" />
            </div>
            <div class="content-main">
              <div class="message">
                📩 {{ alarm.author.username }}님이 메시지를 보냈습니다.
              </div>
              <div class="date">
                {{ new Date(alarm.createdAt).getFullYear() }}/{{
                  new Date(alarm.createdAt).getMonth() + 1
                }}/{{ new Date(alarm.createdAt).getDate() }}
                {{ ("00" + new Date(alarm.createdAt).getHours()).slice(-2) }}:{{
                  ("00" + new Date(alarm.createdAt).getMinutes()).slice(-2)
                }}
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div v-else class="modal_noAlarm">No alarm</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    alarms: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    isShowAlarms() {
      return this.$store.state.modal.alarm;
    },
  },
  methods: {
    changeAlarms() {
      !this.isShowAlarms
        ? this.$store.dispatch("modal/onModal", "alarm")
        : this.$store.dispatch("modal/offModal", "alarm");
    },
    offModal() {
      this.$store.dispatch("modal/offModal", "alarm");
    },
    goMessage() {
      this.$router.push("/message");
    },
  },
};
</script>

<style lang="scss" scoped>
.alarm {
  position: relative;
  width: 30px;
  text-align: center;
  cursor: pointer;

  &_count {
    border-radius: 20px;
    border: none;
    font-weight: 700;
    cursor: pointer;
    background: #fbb80f;
    padding: 5px;
    position: relative;
    img {
      width: 100%;
    }

    &__number {
      position: absolute;
      top: 0;
      right: 0;
      color: red;
    }
  }
}
.modal {
  z-index: 11;
  position: absolute;
  top: 54px;
  right: -200px;
  width: 400px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  box-shadow: 0 5px 10px 0 rgba(34, 36, 38, 0.15);
  padding: 0 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  &_alarmList {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 500px;
    margin-top: 14px;
    margin-bottom: 14px;
    text-align: center;
    border-radius: 10px;
    overflow-y: auto;
    &::-webkit-scrollbar {
    display: none;
  }
  }
}
.alarmList_alarm {
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  &__content {
    width: 100%;
    padding: 5px;
    display: flex;
    align-items: center;
    background-color: #fbb80f;
    border-radius: 20px;
    box-shadow: 0 5px 10px 0 rgba(34, 36, 38, 0.15);
    .content-profile {
      width: 60px;
      height: 60px;
      border-radius: 20px;
      background-color: #fbb80f;
      img {
        border-radius: 20px;
        height: 100%;
      }
    }
    .content-main {
      height: 60px;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .message {
        color: white;
        font-weight: 700;
      }
      .date {
        color: gray;
        display: flex;
        justify-content: flex-end;
        padding-right: 10px;
      }
    }
  }
}
</style>
