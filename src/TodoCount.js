export default function TodoCount({ $target, initialState, onChange }) {
  if (!this) throw new Error("TodoCount 생성 시, new 입력하세요!");

  const $TodoCount = document.createElement("div");
  $target.appendChild($TodoCount);

  this.state = initialState;

  this.render = () => {
    $TodoCount.innerHTML = `
      <div id="todoCount">${this.state.reduce(
        (acc, cur) => (cur.isCompleted ? ++acc : acc),
        0
      )} / ${this.state.length}</div>
    `;
  };

  this.onChange = (nextState) => {
    onChange(nextState);
  };

  this.render();
}
