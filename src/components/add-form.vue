<!-- eslint-disable  -->
<template>
  <section>
    <div class="p-3 add-form-container">
      <form class="row g-3 text-white" onsubmit="return false">
        <!-- id input -->
        <div class="col-md-6">
          <label class="form-label fw-bold"
            >ID
            <i
              class="fa-solid fa-circle-info"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              data-bs-title="Enter numbers only"
            ></i
          ></label>
          <input
            type="number"
            class="form-control"
            name="id"
            v-model="id_value"
            :class="
              id_validation == true
                ? 'is-valid'
                : id_validation == false
                ? 'is-invalid'
                : ''
            "
          />
        </div>
        <!-- sort input -->
        <div class="col-md-3">
          <label class="form-label fw-bold"
            >Sort
            <i
              class="fa-solid fa-circle-info"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              data-bs-title="Enter numbers only"
            ></i
          ></label>
          <input
            type="number"
            class="form-control"
            name="sort"
            v-model="sort_value"
            :class="
              sort_validation == true
                ? 'is-valid'
                : sort_validation == false
                ? 'is-invalid'
                : ''
            "
          />
        </div>
        <!-- accountId input -->
        <div class="col-md-3">
          <label class="form-label fw-bold">Account Id</label>
          <input type="number" class="form-control" disabled value="1" />
        </div>
        <!-- arrivingArabicName input -->
        <div class="col-md-6">
          <label class="form-label fw-bold"
            >Name Ar
            <i
              class="fa-solid fa-circle-info"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              data-bs-title="Enter arabic letters and numbers only"
            ></i
          ></label>
          <input
            type="text"
            class="form-control"
            name="arrivingArabicName"
            v-model="n_ar_value"
            :class="
              n_ar_validation == true
                ? 'is-valid'
                : n_ar_validation == false
                ? 'is-invalid'
                : ''
            "
          />
        </div>
        <!-- arrivingEnglishName input -->
        <div class="col-md-6">
          <label class="form-label fw-bold"
            >Name En
            <i
              class="fa-solid fa-circle-info"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              data-bs-title="Enter letters and numbers only"
            ></i
          ></label>
          <input
            type="text"
            class="form-control"
            name="arrivingEnglishName"
            v-model="n_en_value"
            :class="
              n_en_validation == true
                ? 'is-valid'
                : n_en_validation == false
                ? 'is-invalid'
                : ''
            "
          />
        </div>

        <div class="col-md-12 d-flex justify-content-end">
          <button type="submit" class="btn btn-secondary" @click="submitForm">
            Submit
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
<!-- eslint-disable  -->

<script>
/* eslint-disable */
import * as bootstrap from "bootstrap";

// import toastr for suc. and err. msgs.
import toastr from "toastr";

export default {
  props: ["inputs_data"],
  data() {
    return {
      id_value: null,
      id_validation: null,

      sort_value: null,
      sort_validation: null,

      n_ar_value: null,
      n_ar_validation: null,

      n_en_value: null,
      n_en_validation: null,
    };
  },
  methods: {
    submitForm() {
      if (
        this.id_validation &&
        this.sort_validation &&
        this.n_ar_validation &&
        this.n_en_validation
      ) {
        this.$emit("getFormData", {
          id: parseInt(this.id_value),
          accountId: 1,
          arrivingArabicName: this.n_ar_value,
          arrivingEnglishName: this.n_en_value,
          sort: parseInt(this.sort_value),
        });
        this.id_value = null;
        this.id_validation = null;
        this.sort_value = null;
        this.sort_validation = null;
        this.n_ar_value = null;
        this.n_ar_validation = null;
        this.n_en_value = null;
        this.n_en_validation = null;
      } else {
        toastr.error("please, enter all inputs right!", "Error");
      }
    },
  },
  watch: {
    id_value(newVal, oldVal) {
      if (newVal == null) {
        this.id_validation = null;
        return;
      }
      var numbers = /^[0-9]+$/;
      if (newVal.match(numbers)) {
        this.id_validation = true;
      } else {
        this.id_validation = false;
      }
    },
    sort_value(newVal, oldVal) {
      if (newVal == null) {
        this.sort_validation = null;
        return;
      }
      var numbers = /^[0-9]+$/;
      if (newVal.match(numbers)) {
        this.sort_validation = true;
      } else {
        this.sort_validation = false;
      }
    },
    n_en_value(newVal, oldVal) {
      if (newVal == null) {
        this.n_en_validation = null;
        return;
      }
      var LettersAndSpaces = /[a-zA-Z][a-zA-Z0-9 ]+[a-zA-Z0-9]$/;
      if (newVal.match(LettersAndSpaces)) {
        this.n_en_validation = true;
      } else {
        this.n_en_validation = false;
      }
    },
    // ^[\u0621-\u064A ]+$
    n_ar_value(newVal, oldVal) {
      if (newVal == null) {
        this.n_ar_validation = null;
        return;
      }
      var LettersAndSpaces =
        /[a-zA-Z\u0621-\u064A][a-zA-Z\u0621-\u064A0-9 ]+[a-zA-Z\u0621-\u064A0-9]$/;
      if (newVal.match(LettersAndSpaces)) {
        this.n_ar_validation = true;
      } else {
        this.n_ar_validation = false;
      }
    },
    inputs_data: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.id_value = newVal.id.toString();
          this.sort_value = newVal.sort.toString();
          this.n_ar_value = newVal.arrivingArabicName;
          this.n_en_value = newVal.arrivingEnglishName;
        }
      },
      immediate: true,
    },
  },
  mounted() {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    const tooltipList = [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );
  },
};
</script>

<style>
.add-form-container {
  background-color: var(--main);
  border-radius: 10px;
}
</style>
