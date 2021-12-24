<template>
  <div class="search">
    <div class="search_searchBox">
      <select
        class="search_searchBox__options"
        @change="updateSearchInput({ sort: $event.target.value })"
      >
        <option name="all" class="search_searchBox__option" value="all">
          전체
        </option>
        <option name="users" class="search_searchBox__option" value="users">
          유저
        </option>
      </select>
      <input
        class="search_searchBox__input"
        placeholder="keyword"
        @input="updateSearchInput({ keyword: $event.target.value })"
        @keyup.enter="search"
      />
      <button class="search_searchBox__btn" @click="search">
        <img src="../img/search.png" alt="search" />
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      updateSearchInput(input) {
        this.$store.commit("postSearchStore/updateSearchInput", input);
      },
      async search() {
        if (!this.$store.state.postSearchStore.searchInput.keyword.length) {
          document
            .querySelector(".search_searchBox__input")
            .classList.toggle("required");
          setTimeout(
            () =>
              document
                .querySelector(".search_searchBox__input")
                .classList.toggle("required"),
            2000
          );
          return;
        }

        if (this.$route.name === "search") {
          this.$router.push({
            query: { ...this.$store.state.postSearchStore.searchInput },
          });
        } else {
          this.$router.push({
            name: "search",
            query: this.$store.state.postSearchStore.searchInput,
          });
        }

        this.$store.commit(
          "postSearchStore/updateSearchInput",
          this.$store.state.postSearchStore.searchInput
        );
        this.$store.dispatch("postSearchStore/search");
      },
      toggleChecked(input) {
        this.$store.commit("postSearchStore/toggleFilter", input);
      },
    },
  };
</script>

<style lang="scss" scoped>
  @use "~/scss/color";

  .search {
    &_searchBox {
      display: grid;
      grid-template-columns: 70px auto 70px;
      gap: 10px;
      padding: 10px;
      // NOTE search 전체 높이 54로 맞춤
      margin-bottom: 4px;
      background: #fbb80f;
      border-radius: 5px;

      &__input,
      &__options {
        height: 30px;
        width: 100%;
        border: 3px solid #fff;
        box-sizing: border-box;
        border-radius: 5px;
        transition: all 0.1s ease-in;

        &.required {
          border-color: red;
        }
      }

      &__btn {
        background: #fff;
        height: 30px;

        &:hover {
          background: color.$egg-gray;
        }
        &:active {
          box-shadow: 0 0 1px 3px rgb(170, 170, 170) inset;
        }
      }
    }

    &_filterBox {
      display: flex;
    }

    img {
      height: 100%;
    }
  }
</style>