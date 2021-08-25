// params.$target : 해당 컴포넌트가 추가될 DOM엘리멘트
// params.initialState : 해당 컴포넌트의 초기 싱태
// params.isCompleted : 해당 컴포넌트 내부 요소의 완료여부 토글
// params.onRemove : 해당 컴포넌트 내부 요소 삭제

export default function TodoList({
  $target,
  initialState,
  isCompleted,
  onRemove,
}) {
  const $todoList = document.createElement("div");
  $target.appendChild($todoList);

  try {
    this.constructor = () => {
      this.$target = $target;
      this.initialState = initialState;
      this.onRemove = onRemove;
    };

    this.state = initialState.map((list, index) => {
      if (!list.text) throw new Error(`Todo List[${index}] Validation Error!`);
      list.isCompleted = false;
      return list;
    });

    this.setState = (nextState) => {
      this.state = nextState;
      this.render();
    };

    this.render = () => {
      $todoList.innerHTML = `<ul>${this.state
        .map(
          ({ text, isCompleted }, index) =>
            `<li style="text-decoration:${
              isCompleted ? "line-through" : "none"
            }" class="todo${index}"><span style="cursor:pointer">${text}</span> <button>x</button></li>`
        )
        .join("")}</ul>`;

      $todoList.querySelectorAll("li span").forEach((list) => {
        list.addEventListener("click", (clicked) => {
          const clickedIndex = clicked.target
            .closest("li")
            .className.substring(
              clicked.target.closest("li").className.length - 1
            );
          isCompleted(clickedIndex);
          this.render();
        });
      });

      $todoList.querySelectorAll("li button").forEach((button) => {
        button.addEventListener("click", (clicked) => {
          const clickedIndex = clicked.target
            .closest("li")
            .className.substring(
              clicked.target.closest("li").className.length - 1
            );
          onRemove(clickedIndex);
          this.render();
        });
      });
    };

    this.render();
  } catch (e) {
    alert(e.message);
  }
}
