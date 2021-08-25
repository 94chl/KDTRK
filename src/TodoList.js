// params.$target : 해당 컴포넌트가 추가될 DOM엘리멘트
// params.initialState : 해당 컴포넌트의 초기 싱태
// params.onToggle : 해당 컴포넌트 내부 요소의 완료여부 토글
// params.onRemove : 해당 컴포넌트 내부 요소 삭제

export default function TodoList({
  $target,
  initialState,
  onToggle,
  onRemove,
}) {
  if (!this) throw new Error("TodoList 생성 시, new 입력하세요!");

  const $todoList = document.createElement("div");
  $target.appendChild($todoList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $todoList.innerHTML = `<ul>${this.state
      .map(({ text, isCompleted }, index) => {
        return `<li style="text-decoration:${
          isCompleted ? "line-through" : "none"
        }" id="index${index}"><span style="cursor:pointer" class="todoList">${text}</span> <button class="removeButton">x</button></li>`;
      })
      .join("")}</ul>`;
  };

  $todoList.addEventListener("click", (clicked) => {
    if (clicked.target.hasAttribute("class")) {
      const clickedObject = clicked.target.className;
      const clickedIndex = clicked.target
        .closest("li")
        .getAttribute("id")
        .match(/\d+/g)[0];
      if (clickedObject === "todoList") {
        onToggle(clickedIndex);
      } else if (clickedObject === "removeButton") {
        onRemove(clickedIndex);
      }
    }
  });

  this.render();
}
