<template>
  <form @submit.prevent="exchange">
    <div class="exchanger-form__give">
      <p class="exchanger-form__label">You will give:</p>
      <SelectGiveField
        class="exchanger-form__currency"
        :currencyObserver="currencyObserverGive"
      />
      <InputGiveField
        class="exchanger-form__input"
        :inputObserver="inputObserverGive"
        :disabled="false"
      />
      <p
        class="exchanger-form__error"
        v-for="error of v$.$errors"
        :key="error.$uid"
      >
        {{ error.$message }}
      </p>
      <p class="exchanger-form__warning" v-if="warning">{{ warning }}</p>
    </div>
    <div class="exchanger-form__middle">
      <button
        class="exchanger-form__switch"
        type="button"
        @click="switchValues()"
      >
        Switch
      </button>
    </div>
    <div class="exchanger-form__get">
      <p class="exchanger-form__label">You will get:</p>
      <SelectGetField
        class="exchanger-form__currency"
        :currencyObserver="currencyObserverGet"
      />
      <InputGetField class="exchanger-form__input" :value="amountTwo" />
    </div>
    <div class="exchanger-form__bottom">
      <button
        :class="{
          'exchanger-form__button exchanger-form__button--active ': !v$.$error,
          'exchanger-form__button exchanger-form__button--disabled': v$.$error,
        }"
        :disabled="v$.$error"
      >
        {{ amountOne !== "" ? "Exchange" : "Enter value" }}
      </button>
      <div class="exchanger-form__rate" id="baseValue">
        <p class="exchanger-form__rate-label">Exchange Rate:</p>
        1 {{ currency_one.toUpperCase() }} = {{ rate }}
        {{ currency_two.toUpperCase() }}
      </div>
    </div>
    <ModalExchange
      v-model="isShow"
      :close="closeModal"
      :amountOne="amountOne"
      :amountTwo="amountTwo"
      :currency_one="currency_one"
      :currency_two="currency_two"
    />
  </form>
</template>

<script>
import ModalExchange from "@/vue/common/ModalExchange.vue";
import SelectGiveField from "@/vue/fields/CurrencyExchangeFields/SelectGiveField.vue";
import SelectGetField from "@/vue/fields/CurrencyExchangeFields/SelectGetField.vue";
import InputGiveField from "@/vue/fields/CurrencyExchangeFields/InputGiveField.vue";
import InputGetField from "@/vue/fields/CurrencyExchangeFields/InputGetField.vue";
import { mapGetters, mapActions } from "vuex";
import useVuelidate from "@vuelidate/core";
import getterNames from "@/vuex/getterNames";
import actionNames from "@/vuex/actionNames";
import { minValue, decimal, required } from "@vuelidate/validators";
import { currencyNames } from "@/js/helpers/exchanger.helpers.js";
import exportConvert from "@/js/helpers/promise.helpers.js";
export default {
  name: "exchanger-form",
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  components: {
    ModalExchange,
    SelectGiveField,
    SelectGetField,
    InputGiveField,
    InputGetField,
  },
  data() {
    return {
      currency_one: currencyNames.CURRENCY_USD,
      currency_two: currencyNames.CURRENCY_UAH,
      rate: "",
      amountOne: 1,
      amountTwo: 0,
      warning: "",
      isShow: false,
    };
  },
  validations() {
    return {
      amountOne: {
        minValue: minValue(0.1),
        decimal,
        required,
      },
    };
  },
  computed: {
    ...mapGetters({
      getWallet: getterNames.GET_WALLET,
    }),
  },
  methods: {
    ...mapActions({
      setWalletMinus: actionNames.SET_WALLET_MINUS,
      setWalletPlus: actionNames.SET_WALLET_PLUS,
    }),
    fetchCurrency(currencyOne, currencyTwo) {
      exportConvert
        .converter(currencyOne)
        .then((res) => res.data[currencyOne][currencyTwo])
        .then((res) => {
          this.rate = res;
          this.amountTwo = this.amountOne * this.rate;
        });
    },
    calculateResults() {
      this.warning = "";
      if (this.v$.$error) {
        this.amountTwo = 0;
        return;
      }
      this.fetchCurrency(this.currency_one, this.currency_two);
    },
    switchValues() {
      const temp = this.currency_one;
      this.currency_one = this.currency_two;
      this.currency_two = temp;
      this.calculateResults();
    },
    exchange() {
      const keyOne = this.currency_one;
      const numberOne = Number(this.amountOne.toFixed(4));
      const numberTwo = Number(this.amountTwo.toFixed(4));
      const keyTwo = this.currency_two;
      if (this.getWallet[keyOne] < numberOne) {
        this.warning =
          "There is not enough currency  in yor wallet,try to use other currency,or lower the input number!";
        return;
      }
      this.setWalletMinus({ [keyOne]: numberOne });
      this.setWalletPlus({ [keyTwo]: numberTwo });
      this.showModal();
    },
    showModal() {
      this.isShow = true;
    },
    closeModal() {
      this.isShow = false;
    },
    currencyObserverGive(newCurr) {
      this.currency_one = newCurr;
      this.calculateResults();
    },
    currencyObserverGet(newCurr) {
      this.currency_two = newCurr;
      this.calculateResults();
    },
    inputObserverGive(newAmount) {
      this.v$.amountOne.$model = newAmount;
      this.calculateResults();
    },
  },

  mounted() {
    this.calculateResults();
  },
};
</script>

<style lang="scss">
.exchanger-form__give {
  margin-bottom: 1.5rem;
}

.exchanger-form__label {
  font-size: 1.2rem;
  color: $col-exchanger-form-label;
  margin-bottom: 0.5rem;
}

.exchanger-form__currency {
  height: 2rem;
  margin: 0 1rem 0 0;
}

.exchanger-form__input {
  height: 2rem;
  padding: 0.4rem;
  font-size: 1.1rem;
  outline: $col-exchanger-form-input-outline;
}

.exchanger-form__error {
  color: $col-exchanger-form-error-text;
  font-size: 1.2rem;
  padding: 0.5rem;
}

.exchanger-form__warning {
  color: $col-exchanger-form-warning-text;
  font-size: 1.2rem;
  padding: 0.5rem;
}

.exchanger-form__middle {
  display: flex;
  justify-content: center;
  align-items: center;
}

.exchanger-form__switch {
  cursor: pointer;
  height: 2rem;
  width: 4rem;
  background: $col-exchanger-form-switch-button;
  color: $col-exchanger-form-switch-button-text;
  border: none;
  border-radius: 0.25rem;
}

.exchanger-form__get {
  margin: 1rem 0;
}

.exchanger-form__bottom {
  display: flex;
  justify-content: space-between;
}

.exchanger-form__rate {
  font-size: 1.1rem;
}

.exchanger-form__rate-label {
  font-size: 1.2rem;
  color: $col-exchanger-form-rate-border;
  margin-bottom: 0.3rem;
}
.exchanger-form__button {
  cursor: pointer;
  border: none;
  padding: 0.5rem;
  border-radius: 0.25rem;
  &--active {
    background-color: $col-exchanger-form-button-active;
    color: $col-exchanger-form-button-text-active;
  }
  &--disabled {
    opacity: 0.4;
    background-color: $col-exchanger-form-button-disabled;
    color: $col-exchanger-form-button-text-disabled;
  }
}
</style>
