export default function TodoForm({ $target, onSubmit }) {
  const $form = document.createElement("form");
  $target.appendChild($form);

  let isInit = false;

  try {
    this.constructor = () => {
      this.$target = $target;
      this.onSubmit = onSubmit;
    };

    this.render = () => {
      $form.innerHTML = `<input type="text" name="todo" />
      <button>add</button>`;

      if (!isInit) {
        $form.addEventListener("submit", (e) => {
          e.preventDefault();

          const $todo = $form.querySelector("input[name=todo]");
          const text = $todo.value;

          $todo.value = "";

          text != "" ? onSubmit(text) : null;
        });
        isInit = true;
      }
    };

    this.render();
  } catch (e) {
    alert(e.message);
  }
}
