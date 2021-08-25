export default function TodoForm({ $target, onSubmit }) {
  if (!this) throw new Error("TodoForm 생성 시, new 입력하세요!");

  const $form = document.createElement("form");
  $target.appendChild($form);

  let isInit = false;

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
}
