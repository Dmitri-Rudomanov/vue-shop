<template>
  <Modal>
    <div class="modal-exchange">
      <h2 class="modal-exchange__message">
        You have successfully exchanged
        <span class="modal-exchange__currency-spent"
          >{{ amountOne }}{{ currency_one }}</span
        >
        to
        <span class="modal-exchange__currency-got"
          >{{ amountTwo }}{{ currency_two }}</span
        >
      </h2>
      <button class="modal-exchange__btn" @click="close">close</button>
    </div>
  </Modal>
</template>

<script>
export default {
  name: "modal-exchange",
  props: {
    close: Function,
    amountOne: Number,
    amountTwo: Number,
    currency_one: String,
    currency_two: String,
  },
};
</script>

<style lang="scss">
.modal-exchange {
  width: 25rem;
  padding: 2rem;
  box-sizing: border-box;
  background-color: $col-modal-exchange-background;
  font-size: 1.3rem;
  text-align: center;
  line-height: 1.5;
}

.modal-exchange__message {
  color: $col-modal-exchange-message;
}

.modal-exchange__currency-spent {
  color: $col-modal-exchange-currency-spent;
  text-decoration: underline;
}

.modal-exchange__currency-got {
  color: $col-modal-exchange-currency-got;
  text-decoration: underline;
}

.modal-exchange__btn {
  cursor: pointer;
  width: 5rem;
  padding: 0.4rem;
  font-size: 1.2rem;
  margin-top: 0.7rem;
  color: $col-modal-exchange-button-text;
  background-color: $col-modal-exchange-button;
  border: none;
  border-radius: 0.25rem;
}
</style>
