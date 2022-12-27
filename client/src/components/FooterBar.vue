<template>
  <footer class="footer">
    <div class="footer__copyright">
      © 2022 Netflix Clone by Oğuzhan VAROL
    </div>
  </footer>
</template>
<script>
import { ref } from "vue";

export default {
  setup() {
    let btnText = ref("Service Code");

    function changeText() {
      btnText.value = "1164-1907";
    }

    return {
      btnText,
      changeText,
    };
  },
};
</script>

<style lang="scss">
.footer {
  max-width: 1040px;
  margin: 0 auto;
  padding: 10px 40px;

  @include mq("mobile", max) {
    text-align: center;
  }

  &__links {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 5px;
  }

  &__column {
    display: flex;
    flex-direction: column;
    color: $footer-link;

    @include mq("tablet", max) {
      width: 230px;
    }

    @include mq("small", max) {
      width: 160px;
    }

    @include mq("mobile", max) {
      margin: auto;
    }
  }

  &__link {
    @include font-size(13);
    color: $footer-link;
    text-decoration: none;
    margin-bottom: 5px;

    &:hover {
      text-decoration: underline;
    }
  }

  &__btn {
    background: transparent;
    color: $footer-link;
    border: 1px solid $footer-link;
    padding: 5px;
    cursor: pointer;
    margin-block: 15px;
  }

  &__copyright {
    color: $footer-link;
  }

  &__icon {
    display: inline-block;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 5px;

  }
}
</style>
